import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//css imports
import "./index.css";
import "./styles/icons/icons.css";
//js imports

import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
