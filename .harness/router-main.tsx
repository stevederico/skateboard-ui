import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../styles.css"
import { RouterFixture } from "./RouterFixture"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterFixture />
  </StrictMode>
)
