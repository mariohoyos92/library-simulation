import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/tan-logo.svg";

import "./Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    console.log("hit");
    axios
      .post("/api/auth/logout", {})
      .then(res => {
        console.log(res);
        return this.props.history.push("/");
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="nav-container">
        <div className="nav-left">
          <img src={logo} alt="logo" />
          <Link className="navlink" to="/browseview">
            <p>Browse</p>
          </Link>
          <Link className="navlink" to="/cart">
            <p>Cart</p>
          </Link>
          <Link className="navlink" to="/shelf">
            <p>My Shelf</p>
          </Link>
        </div>
        <p className="navlink logout" onClick={() => this.handleLogout()}>
          Logout
        </p>
      </div>
    );
  }
}

export default withRouter(Navigation);
