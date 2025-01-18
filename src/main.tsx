import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StateProviderParsed } from "./context/ParsedDataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateProviderParsed>
      <App />
    </StateProviderParsed>
  </StrictMode>
);
