import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TanstackProvider from "./providers/TanstackProvider.tsx";
import MaterialUiProvider from "./providers/MaterialUiProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <MaterialUiProvider>
        <App />
      </MaterialUiProvider>
    </TanstackProvider>
  </StrictMode>
);
