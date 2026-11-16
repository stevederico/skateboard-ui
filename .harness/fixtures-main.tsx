import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../styles.css"
import "./harness.css"
import { Fixtures } from "./Fixtures"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Fixtures />
  </StrictMode>
)
