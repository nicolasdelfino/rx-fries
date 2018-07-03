import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import Sample from "./Sample";
import { createLogger } from "redux-logger";
import { reduxFries } from "redux-fries";

const reducer = (state = { subscribed: false }, action) => {
  switch (action.type) {
    case "SUBSCRIBE":
      return { ...state, subscribed: true };
    case "UNSUBSCRIBE":
      return { ...state, subscribed: false };
    default:
      return state;
  }
};

export const logger = createLogger({
  diff: true
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxFries, logger)
);
const rootEl = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <Sample
      isSubscribed={store.getState().subscribed}
      fireSubscribe={() => store.dispatch({ type: "SUBSCRIBE" })}
      fireUnsubscribe={() => store.dispatch({ type: "UNSUBSCRIBE" })}
      fireAction={() => store.dispatch({ type: "SOME_ACTION" })}
    />,
    rootEl
  );
};

render();
store.subscribe(render);
