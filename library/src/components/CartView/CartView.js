import React, { Component } from "react";

import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./CartView.css";

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    //BIND FUNCTIONS HERE
  }

  //LIFESTYLE FUNCTIONS

  //CUSTOM FUNCS

  //RENDER
  render() {
    return (
      <div>
        <Navigation />
        <div className="browser-view" />
      </div>
    );
  }
}

//EXPORT COMPONENT
export default CartView;
