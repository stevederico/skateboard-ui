import { defineConfig } from "vite"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { dedupe: ["react", "react-dom"] },
  server: { port: 5199, fs: { allow: [".."] } },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        tests: fileURLToPath(new URL("./tests.html", import.meta.url)),
      },
    },
  },
})
