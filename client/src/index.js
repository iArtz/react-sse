import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppFunc from "./AppFunc";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <div>
    <App />
    <AppFunc />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
