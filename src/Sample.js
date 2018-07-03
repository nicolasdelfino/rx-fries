import React, { Component, PropTypes } from "react";
import Emoji from "react-emoji-render";
import { Twemoji } from "react-emoji-render";

import { subscribe, unsubscribe } from "redux-fries";

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localSubscription: null,
      callbackValue: ""
    };

    this.someCallback = this.someCallback.bind(this);
  }

  componentWillUnmount() {
    this.unsubscribeFromAction();
  }

  someCallback(getState) {
    console.log("callback, state:", getState);
    this.setState({ callbackValue: "fries!" });
  }

  subscribeToAction() {
    if (this.props.isSubscribed) {
      return;
    }

    this.props.fireSubscribe();

    const reference = subscribe("SOME_ACTION", this.someCallback);
    this.setState({ localSubscription: reference });
  }

  unsubscribeFromAction() {
    this.props.fireUnsubscribe();

    unsubscribe(this.state.localSubscription);
    this.setState({ callbackValue: "", localSubscription: null });
  }

  getStatus() {
    if (this.props.isSubscribed) {
      return (
        <span className="status subscribed">
          true (id:{this.state.localSubscription})
        </span>
      );
    }

    return <span className="status unsubscribed">false</span>;
  }

  render() {
    const { fireAction, isSubscribed } = this.props;
    return (
      <div>
        <p className="title">
          <Twemoji text="redux-fries 🍟" />
        </p>
        <p className="info">
          "Greasy middleware for subscribing to actions and creating nasty side-effects in your
          code"
        </p>
        <p className="code">yarn install redux-fries</p>

        <h2>Subscribe</h2>
        <p className="code">
          import {"{ subscribe, unsubscribe }"} from 'redux-fries'
        </p>
        <p className="moreInfo">
          Pass the action key to subscribe and the callback that you want fired when that action
          dispatches.
        </p>
        <p className="code">const localSub = subscribe('SOME_ACTION', callback)</p>
        <h2>Unsubscribe</h2>
        <p>
          The const localSub now holds the unique id returned from subscribe, this id consists of
          the key argument plus a unique identifier, e.g 'SOME_ACTION_#1'
        </p>
        <p>
          So to unsubscribe you just call the unsubscribe method with the unique id as the argument
        </p>
        <p className="code">unsubscribe(localSub)</p>
        <h2>Example</h2>
        <p>
          Component is subscribed: {this.getStatus()}
        </p>
        <div>
          <p>#1. subcribe or unsubscribe to "SOME_ACTION"</p>
          <button onClick={() => this.subscribeToAction()} disabled={isSubscribed ? true : false}>
            SUBCRIBE
          </button>{" "}
          <button
            onClick={() => this.unsubscribeFromAction()}
            disabled={isSubscribed ? false : true}
          >
            UNSUBSCRIBE
          </button>{" "}
        </div>
        <p>#2. Dispatch the action and check your console:</p>

        <p>
          <button onClick={fireAction}>SOME_ACTION</button>
        </p>
        <p>
          #3. Callback:{" "}
          <span className="callbackValue">
            {this.state.callbackValue === "fries!" ? <Twemoji text="🍟" /> : null}
          </span>
        </p>
      </div>
    );
  }
}

Sample.propTypes = {
  isSubscribed: PropTypes.bool,
  fireAction: PropTypes.func.isRequired,
  fireSubscribe: PropTypes.func.isRequired,
  fireUnsubscribe: PropTypes.func.isRequired
};

export default Sample;
