import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./lib/redux";
import { QueryProvider } from "./lib/react-query";
import { Toaster } from "./components/ui/toaster";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </QueryProvider>
    </Provider>
  </StrictMode>
);
