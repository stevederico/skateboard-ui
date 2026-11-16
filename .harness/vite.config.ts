import { defineConfig } from "vite"
import type { Connect, Plugin } from "vite"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// The router fixture is a browser-history app mounted at /router/*: serve
// router.html for every path under it (the default SPA fallback is index.html).
const routerFallback: Connect.NextHandleFunction = (req, _res, next) => {
  if (req.url && /^\/router(?:[/?#]|$)/.test(req.url)) req.url = "/router.html"
  next()
}
const routerFixture: Plugin = {
  name: "router-fixture-fallback",
  configureServer: (server) => void server.middlewares.use(routerFallback),
  configurePreviewServer: (server) => void server.middlewares.use(routerFallback),
}

export default defineConfig({
  plugins: [react(), tailwindcss(), routerFixture],
  resolve: { dedupe: ["react", "react-dom"] },
  server: { port: 5199, fs: { allow: [".."] } },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        tests: fileURLToPath(new URL("./tests.html", import.meta.url)),
        router: fileURLToPath(new URL("./router.html", import.meta.url)),
      },
    },
  },
})
