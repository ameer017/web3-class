import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProposalProvider } from "./context/proposalContext.jsx";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Theme appearance="dark">

    <ProposalProvider>
      <App />
    </ProposalProvider>
    </Theme>
  </StrictMode>
);
