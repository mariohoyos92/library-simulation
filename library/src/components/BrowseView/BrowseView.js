import React, { Component } from "react";

import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./BrowseView.css";

class BrowseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: ""
    };

    //BIND FUNCTIONS HERE
  }

  //LIFESTYLE FUNCTIONS

  //CUSTOM FUNCS

  //RENDER
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BrowseView;
