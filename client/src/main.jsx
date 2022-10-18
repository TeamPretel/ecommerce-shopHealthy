import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import { store } from "./store/store";
import { App } from "./App";
import "./index.css";
import { greenTheme } from "./theme";



ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={greenTheme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

