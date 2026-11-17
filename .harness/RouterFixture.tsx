import {
  createBrowserRouter,
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "../dist/router/index.mjs"
import { RouterProvider } from "../dist/router/dom-export.mjs"
import { useSafeNavigate } from "../dist/components/core/Utilities.js"

const BOOTS_KEY = "routerFixtureBoots"
const boots = Number(sessionStorage.getItem(BOOTS_KEY) ?? "0") + 1
sessionStorage.setItem(BOOTS_KEY, String(boots))

function Shell() {
  const location = useLocation()
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> <Link to="/users/42">User 42 link</Link>{" "}
        <Link to="/search?q=hello">Search link</Link>
      </nav>
      <div data-testid="location">{location.pathname + location.search}</div>
      <div data-testid="boots">{boots}</div>
      <main data-testid="outlet">
        <Outlet />
      </main>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  const safeNavigate = useSafeNavigate()
  return (
    <section>
      <h1>Router home</h1>
      <button type="button" onClick={() => navigate("/users/42")}>
        Navigate to user 42
      </button>
      <button type="button" onClick={() => safeNavigate("/search?q=safe")}>
        Safe navigate to search
      </button>
    </section>
  )
}

function User() {
  const { id } = useParams()
  return (
    <section>
      <h1>User {id}</h1>
      <Link to="posts/9">Post 9</Link>
      <div data-testid="user-outlet">
        <Outlet />
      </div>
    </section>
  )
}

function Post() {
  const { id, postId } = useParams()
  return <p data-testid="post">Post {postId} of user {id}</p>
}

function Search() {
  const [params, setParams] = useSearchParams()
  return (
    <section>
      <h1>Search</h1>
      <div data-testid="q">{params.get("q") ?? ""}</div>
      <button type="button" onClick={() => setParams({ q: "world" })}>
        Set q to world
      </button>
    </section>
  )
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Shell />,
      children: [
        { index: true, element: <Home /> },
        { path: "users/:id", element: <User />, children: [{ path: "posts/:postId", element: <Post /> }] },
        { path: "search", element: <Search /> },
        { path: "old", element: <Navigate to="/users/7" replace /> },
        { path: "*", element: <p>Router 404</p> },
      ],
    },
  ],
  { basename: "/router" }
)

export function RouterFixture() {
  return <RouterProvider router={router} />
}
