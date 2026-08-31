import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";

import "./css-tailwind.css";
import "./css-reset.css";
import "./css-globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
