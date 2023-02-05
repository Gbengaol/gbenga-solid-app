/* @refresh reload */
import { render } from "solid-js/web";
import "tailwindcss/tailwind.css";
import App from "./App";
import { Router } from "@solidjs/router";

import "./index.css";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
