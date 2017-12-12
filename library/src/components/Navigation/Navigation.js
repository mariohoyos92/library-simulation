import React, { Component } from "react";

import logo from "../../assets/tan-logo.svg";

import "./Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-container">
        <div className="nav-left">
          <img src={logo} alt="logo" />
          <p>Browse</p>
          <p>Cart</p>
          <p>My Shelf</p>
        </div>
        <p className="logout">Logout</p>
      </div>
    );
  }
}

export default Navigation;
