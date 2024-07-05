import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import App from "./App.jsx";
import GeneralContextProvider from "./contexts/GeneralContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <GeneralContextProvider>
        <App />
      </GeneralContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
