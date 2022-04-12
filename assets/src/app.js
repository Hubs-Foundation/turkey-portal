import "./css/app.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import { App } from "./components/App";
import { store } from "./components/store/store";

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
