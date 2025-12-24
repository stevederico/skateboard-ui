/**
 * Vite configuration utilities for skateboard-ui
 * This file is for build-time use only (in vite.config.js)
 */

/**
 * Custom logger plugin for Vite
 */
export const customLoggerPlugin = () => {
    return {
        name: 'custom-logger',
        configureServer(server) {
            server.printUrls = () => {
                console.log(`🖥️  React is running on http://localhost:${server.config.server.port || 5173}`);
            };
        }
    };
};

/**
 * HTML replacement plugin
 * Replaces {{APP_NAME}}, {{TAGLINE}}, {{COMPANY_WEBSITE}} in index.html
 */
export const htmlReplacePlugin = () => {
    return {
        name: 'html-replace',
        async transformIndexHtml(html) {
            const { readFileSync } = await import('node:fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));

            return html
                .replace(/{{APP_NAME}}/g, constants.appName)
                .replace(/{{TAGLINE}}/g, constants.tagline)
                .replace(/{{COMPANY_WEBSITE}}/g, constants.companyWebsite);
        }
    };
};

/**
 * Dynamic robots.txt plugin
 */
export const dynamicRobotsPlugin = () => {
    return {
        name: 'dynamic-robots',
        async generateBundle() {
            const { readFileSync } = await import('node:fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));
            const website = constants.companyWebsite.startsWith('http')
                ? constants.companyWebsite
                : `https://${constants.companyWebsite}`;

            const robotsContent = `User-agent: Googlebot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: Bingbot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: Applebot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: facebookexternalhit
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: *
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/
Allow: /

Sitemap: ${website}/sitemap.xml`;

            this.emitFile({
                type: 'asset',
                fileName: 'robots.txt',
                source: robotsContent
            });
        }
    };
};

/**
 * Dynamic sitemap.xml plugin
 */
export const dynamicSitemapPlugin = () => {
    return {
        name: 'dynamic-sitemap',
        async generateBundle() {
            const { readFileSync } = await import('node:fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));
            const website = constants.companyWebsite.startsWith('http')
                ? constants.companyWebsite
                : `https://${constants.companyWebsite}`;

            const currentDate = new Date().toISOString().split('T')[0];

            const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${website}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${website}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${website}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${website}/signin</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${website}/signup</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

            this.emitFile({
                type: 'asset',
                fileName: 'sitemap.xml',
                source: sitemapContent
            });
        }
    };
};

/**
 * Dynamic manifest.json plugin
 */
export const dynamicManifestPlugin = () => {
    return {
        name: 'dynamic-manifest',
        async generateBundle() {
            const { readFileSync } = await import('node:fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));

            const manifestContent = {
                short_name: constants.appName,
                name: constants.appName,
                description: constants.tagline,
                icons: [
                    {
                        src: "/icons/icon.svg",
                        sizes: "192x192",
                        type: "image/svg+xml"
                    }
                ],
                start_url: "./app",
                display: "standalone",
                theme_color: "#000000",
                background_color: "#ffffff"
            };

            this.emitFile({
                type: 'asset',
                fileName: 'manifest.json',
                source: JSON.stringify(manifestContent, null, 2)
            });
        }
    };
};

/**
 * Complete Vite config generator
 * Returns standard skateboard config with optional overrides
 */
export async function getSkateboardViteConfig(customConfig = {}) {
    const [react, tailwindcss, { resolve }, path] = await Promise.all([
        import('@vitejs/plugin-react-swc').then(m => m.default),
        import('@tailwindcss/vite').then(m => m.default),
        import('node:path'),
        import('node:path')
    ]);

    return {
        plugins: [
            react(),
            tailwindcss(),
            customLoggerPlugin(),
            htmlReplacePlugin(),
            dynamicRobotsPlugin(),
            dynamicSitemapPlugin(),
            dynamicManifestPlugin(),
            ...(customConfig.plugins || [])
        ],
        esbuild: {
            drop: []
        },
        resolve: {
            alias: {
                '@': resolve(process.cwd(), './src'),
                '@package': path.resolve(process.cwd(), 'package.json'),
                '@root': path.resolve(process.cwd()),
                'react/jsx-runtime': path.resolve(process.cwd(), 'node_modules/react/jsx-runtime.js'),
                ...(customConfig.resolve?.alias || {})
            }
        },
        optimizeDeps: {
            include: [
                'react',
                'react-dom',
                'react-dom/client',
                '@radix-ui/react-slot',
                'cookie',
                'set-cookie-parser',
                ...(customConfig.optimizeDeps?.include || [])
            ],
            exclude: [
                '@swc/core',
                '@swc/core-darwin-arm64',
                '@swc/wasm',
                'lightningcss',
                'fsevents',
                ...(customConfig.optimizeDeps?.exclude || [])
            ],
            esbuildOptions: {
                target: 'esnext',
                define: {
                    global: 'globalThis'
                },
                ...(customConfig.optimizeDeps?.esbuildOptions || {})
            }
        },
        server: {
            host: 'localhost',
            open: false,
            port: 5173,
            strictPort: false,
            hmr: {
                port: 5173,
                overlay: false,
            },
            watch: {
                usePolling: false,
                ignored: ['**/node_modules/**', '**/.git/**']
            },
            ...(customConfig.server || {})
        },
        logLevel: 'error',
        ...customConfig
    };
}