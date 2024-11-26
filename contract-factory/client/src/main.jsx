import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { FaucetProvider } from "./context/contractFactory.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Theme appearance="light">
      <FaucetProvider>
        <App />
      </FaucetProvider>
    </Theme>
  </StrictMode>
);
