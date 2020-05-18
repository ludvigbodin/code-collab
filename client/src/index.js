import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import "./resources/Topbar.css";
import "./resources/Sidebar.css";
import "./resources/Console.css";
import "react-toastify/dist/ReactToastify.css";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";

const middleware = [thunk];

const enhancers = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

const store = createStore(rootReducer, enhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
