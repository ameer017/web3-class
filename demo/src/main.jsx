import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import {TodoContextProvider} from "./contexr/todoContext"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />

    <Theme appearance="dark">
    <TodoContextProvider>
      <App />
      </TodoContextProvider>
    </Theme>
  </StrictMode>
);
