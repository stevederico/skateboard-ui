# Authentication Guide

## Architecture Overview

skateboard-ui uses a **hybrid cookie + localStorage authentication system** that combines security with performance:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Authentication Flow                      │
└─────────────────────────────────────────────────────────────────┘

  Frontend                    Backend                   Storage
  ────────                    ───────                   ───────

1. POST /signin           →  Validate credentials
   credentials
                          ←  Set-Cookie: {appName}_token (HttpOnly)
                          ←  Set-Cookie: csrf_token
                          ←  Response: { csrfToken, ...user }

2. Extract tokens         →                          localStorage:
   - CSRF from cookie                                  {appName}_csrf
   - User from response                                {appName}_user

3. isAuthenticated()      →                          Check localStorage
   (client-side)                                      (fast, no network)

4. ProtectedRoute         →  GET /me
   (server validation)       Validate cookies
                          ←  200 OK or 401 Unauthorized

5. API requests           →  Protected endpoints
   + cookies (automatic)     Validate {appName}_token
   + X-CSRF-Token header     Validate CSRF header
```

## How It Works

### Cookie-Based Session Management
- **Session token** stored in `{appName}_token` cookie (HttpOnly, Secure, SameSite=Strict)
- Automatically sent with every request via browser
- Cannot be accessed by JavaScript (XSS protection)
- Backend validates cookie on each protected endpoint

### localStorage for Client-Side Validation
- **CSRF token** and **user data** stored in localStorage
- Enables instant `isAuthenticated()` checks without network calls
- Used by client-side routing logic (ProtectedRoute initial check)
- Not used for actual authentication (cookies handle that)

### CSRF Protection
- Dual-token system prevents CSRF attacks
- **CSRF token** sent in `X-CSRF-Token` header with state-changing requests
- Backend validates header matches stored session CSRF token
- Separate from session cookie to prevent cookie-based CSRF

## Backend Requirements

### Required Endpoints

#### POST /signup
Create new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
- Status: 201 Created
- Headers:
  - `Set-Cookie: {appName}_token={sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/`
  - `Set-Cookie: csrf_token={csrfToken}; Secure; SameSite=Lax; Path=/`
- Body:
```json
{
  "csrfToken": "csrf_abc123...",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /signin
Authenticate existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
- Status: 200 OK
- Headers: Same as /signup
- Body: Same as /signup

#### GET /me
Validate current session and return user data.

**Request:**
- Headers: Cookies automatically sent by browser

**Response (authenticated):**
- Status: 200 OK
- Body:
```json
{
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response (not authenticated):**
- Status: 401 Unauthorized

#### POST /signout
End current session.

**Request:**
- Headers:
  - Cookies automatically sent
  - `X-CSRF-Token: {csrfToken}`

**Response:**
- Status: 200 OK
- Headers:
  - `Set-Cookie: {appName}_token=; Max-Age=0; Path=/` (clear cookie)
  - `Set-Cookie: csrf_token=; Max-Age=0; Path=/` (clear cookie)

### Cookie Configuration

**Session Token Cookie:**
```javascript
{
  name: '{appName}_token',
  httpOnly: true,      // Prevents JavaScript access (XSS protection)
  secure: true,        // HTTPS only (production)
  sameSite: 'Strict',  // Strongest CSRF protection
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days (configurable)
}
```

**CSRF Token Cookie:**
```javascript
{
  name: 'csrf_token',
  httpOnly: false,     // Must be readable by JavaScript
  secure: true,        // HTTPS only (production)
  sameSite: 'Lax',     // Allow top-level navigation
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000  // Match session token
}
```

### Protected Endpoints
All authenticated endpoints must:
1. Validate `{appName}_token` cookie exists and is valid
2. For state-changing operations (POST, PUT, DELETE), validate `X-CSRF-Token` header
3. Return 401 if authentication fails
4. Return 403 if CSRF validation fails

## Frontend Flow

### 1. User Signs In
```javascript
// SignInView.jsx
const response = await fetch(`${getBackendURL()}/signin`, {
  method: 'POST',
  credentials: 'include',  // Send and receive cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
// Backend has set cookies automatically
```

### 2. Store CSRF Token and User Data
```javascript
// Extract CSRF token from cookie or response body
const csrfToken = getCookie('csrf_token') || data.csrfToken;

// Save to localStorage with app-specific keys
localStorage.setItem(`${appName}_csrf`, csrfToken);
localStorage.setItem(`${appName}_user`, JSON.stringify(data.user));
```

### 3. Client-Side Authentication Check
```javascript
// Utilities.js:isAuthenticated()
export function isAuthenticated() {
  const csrf = localStorage.getItem(getAppKey('csrf'));
  const user = localStorage.getItem(getAppKey('user'));
  return !!(csrf && user);
}

// Usage in components
if (isAuthenticated()) {
  // Show authenticated UI
}
```

### 4. Server-Side Validation
```javascript
// ProtectedRoute.jsx
useEffect(() => {
  fetch(`${getBackendURL()}/me`, {
    credentials: 'include'  // Sends session cookie
  })
  .then(response => {
    if (response.status === 401) {
      // Not authenticated - redirect to signin
      navigate('/signin');
    }
  });
}, []);
```

### 5. Making Authenticated Requests
```javascript
// All API requests include cookies and CSRF token
const response = await fetch(`${getBackendURL()}/protected-endpoint`, {
  method: 'POST',
  credentials: 'include',  // Automatically includes cookies
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken()  // From localStorage
  },
  body: JSON.stringify(data)
});
```

## Security Considerations

### XSS Protection
- **Session token is HttpOnly** - JavaScript cannot access it
- Even if attacker injects malicious script, they cannot steal session token
- CSRF token in localStorage is less sensitive (validated server-side)

### CSRF Protection
- **Dual-token pattern** prevents cookie-based CSRF attacks
- Attacker cannot forge `X-CSRF-Token` header from external site
- Cookie's SameSite attribute provides additional protection

### SameSite Cookie Policy
- **Session token (Strict)** - Never sent on cross-site requests
- **CSRF token (Lax)** - Sent on top-level navigation (allows direct links)
- Provides strong CSRF protection at browser level

### LocalStorage Trade-offs
- **Vulnerable to XSS** - If site has XSS vulnerability, localStorage can be read
- **Acceptable for CSRF token** - CSRF token alone cannot authenticate requests
- **Never store session token in localStorage** - Always use HttpOnly cookies

### HTTPS Requirement
- All cookies marked `Secure` - only sent over HTTPS in production
- Development mode (HTTP) may need `Secure: false` based on environment

## Example Backend Implementation (Express.js)

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';

const app = express();
app.use(express.json());
app.use(cookieParser());

// In-memory session store (use Redis in production)
const sessions = new Map();

// Generate secure random token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Middleware: Validate session token
function requireAuth(req, res, next) {
  const sessionToken = req.cookies.myapp_token;
  const session = sessions.get(sessionToken);

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  req.session = session;
  next();
}

// Middleware: Validate CSRF token
function requireCSRF(req, res, next) {
  const csrfToken = req.headers['x-csrf-token'];

  if (!req.session || req.session.csrfToken !== csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
}

// POST /api/signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Create user (pseudo-code)
  const user = await createUser(email, password);

  // Create session
  const sessionToken = generateToken();
  const csrfToken = generateToken();

  sessions.set(sessionToken, {
    userId: user.id,
    csrfToken,
    createdAt: Date.now()
  });

  // Set cookies
  res.cookie('myapp_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  });

  res.cookie('csrf_token', csrfToken, {
    httpOnly: false,  // Readable by JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  // Return user data and CSRF token
  res.status(201).json({
    csrfToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// POST /api/signin
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validate credentials (pseudo-code)
  const user = await validateCredentials(email, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create session (same as signup)
  const sessionToken = generateToken();
  const csrfToken = generateToken();

  sessions.set(sessionToken, {
    userId: user.id,
    csrfToken,
    createdAt: Date.now()
  });

  // Set cookies (same as signup)
  res.cookie('myapp_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.cookie('csrf_token', csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    csrfToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// GET /api/me
app.get('/api/me', requireAuth, async (req, res) => {
  // Get user from session
  const user = await getUserById(req.session.userId);

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// POST /api/signout
app.post('/api/signout', requireAuth, requireCSRF, (req, res) => {
  const sessionToken = req.cookies.myapp_token;

  // Delete session
  sessions.delete(sessionToken);

  // Clear cookies
  res.clearCookie('myapp_token');
  res.clearCookie('csrf_token');

  res.json({ message: 'Signed out successfully' });
});

// Protected endpoint example
app.post('/api/protected-action', requireAuth, requireCSRF, (req, res) => {
  // Handle protected action
  res.json({ message: 'Action completed' });
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
```

## Troubleshooting

### "Not authenticated" after signing in

**Symptoms:** User signs in successfully but immediately redirected to signin page.

**Causes:**
1. Cookies not being sent with requests
2. Cookie domain/path mismatch
3. CORS blocking cookies

**Solutions:**
- Verify `credentials: 'include'` in all fetch calls
- Check cookie `domain` and `path` settings
- Ensure CORS allows credentials: `Access-Control-Allow-Credentials: true`
- Verify `Access-Control-Allow-Origin` is specific origin, not `*`

### CSRF validation failing

**Symptoms:** Protected endpoints return 403 Forbidden.

**Causes:**
1. CSRF token not in localStorage
2. Header not being sent
3. Token mismatch

**Solutions:**
- Check `localStorage.getItem('{appName}_csrf')` exists
- Verify `X-CSRF-Token` header is set
- Ensure CSRF cookie and localStorage token match
- Check CSRF token not expired (matches session lifetime)

### Cookies not persisting across requests

**Symptoms:** User authenticated on signin but /me returns 401.

**Causes:**
1. SameSite policy blocking cookies
2. Secure flag on HTTP (development)
3. Domain mismatch

**Solutions:**
- Development: Set `secure: false` when `NODE_ENV !== 'production'`
- Check frontend and backend on same domain (or use proxy)
- Verify SameSite policy allows your use case

### LocalStorage cleared unexpectedly

**Symptoms:** `isAuthenticated()` returns false but session cookie exists.

**Causes:**
1. User cleared browser data
2. localStorage quota exceeded
3. Private browsing mode

**Solutions:**
- Re-fetch user data from `/me` endpoint
- Implement session restoration from cookie
- Handle `isAuthenticated()` false as trigger to validate with backend

### Session token stolen (security incident)

**Symptoms:** User receives "already logged in" errors or unauthorized actions.

**Response:**
1. Revoke all sessions for affected user
2. Force password reset
3. Audit recent account activity
4. Investigate XSS vulnerabilities if token was HttpOnly
5. Check for MITM attack if token was Secure

## No-Login Mode

For development or public-only apps, disable authentication:

```javascript
const constants = {
  noLogin: true,
  // ... other constants
};
```

Effects:
- `isAuthenticated()` always returns `true`
- ProtectedRoute allows all access
- Signin/signup views still render but aren't enforced
- No authentication state management
