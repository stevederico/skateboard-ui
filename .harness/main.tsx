import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../styles.css"
import { App } from "./App"

try {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} catch (err) {
  document.body.innerHTML =
    '<pre style="white-space:pre-wrap;color:red;padding:16px;font:12px monospace">' +
    String((err as Error)?.stack || err) +
    "</pre>"
}
window.addEventListener("error", (e) => {
  const pre = document.createElement("pre")
  pre.style.cssText =
    "white-space:pre-wrap;color:orange;padding:16px;font:12px monospace"
  pre.textContent = "window.error: " + (e.error?.stack || e.message)
  document.body.appendChild(pre)
})
