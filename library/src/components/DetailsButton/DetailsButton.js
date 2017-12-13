import React, { Component } from "react";
import { Link } from "react-router-dom";

//IMPORT CSS
import "./DetailsButton.css";

class DetailsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    //BIND FUNCTIONS HERE
  }

  //LIFESTYLE FUNCTIONS

  //CUSTOM FUNCS

  //RENDER
  render() {
    const { id } = this.props;
    return (
      <div>
        <Link to={`details/:${id}`}>
          <button>Details</button>
        </Link>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default DetailsButton;
