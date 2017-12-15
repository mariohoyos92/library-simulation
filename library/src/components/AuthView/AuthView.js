import React, { Component } from "react";

//IMPORT MODULES
import axios from "axios";

import maroonLogo from "../../assets/maroon-logo.svg";

//IMPORT CSS
import "./AuthView.css";

class AuthView extends Component {
  //IMPORTS PROPS FROM PARENT
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userName: "",
      userId: "",
      userPass: ""
    };

    //BIND FUNCTIONS HERE
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  //LIFESTYLE FUNCTIONS

  //CUSTOM FUNCS
  handleLogin() {
    axios
      .post("/api/auth/login", {
        username: this.state.userName,
        password: this.state.userPass
      })
      .then(res => {
        this.setState({ loggedIn: true });
        this.props.history.push("/browseview");
      })
      .catch(console.log);
  }

  handleUsername(e) {
    this.setState({ userName: e.target.value });
  }

  handlePassword(e) {
    this.setState({ userPass: e.target.value });
  }

  handleRegister() {
    axios
      .post("/api/auth/register", {
        username: this.state.userName,
        password: this.state.userPass
      })
      .then(res => {
        this.setState({ loggedIn: true });
        this.props.history.push("/browseview");
      })
      .catch(console.log);
  }

  //RENDER
  render() {
    return (
      <div className="authview-cont">
        <div className="authview-card browser-card flex-center-col">
          <div className="authview-head flex-center-col ">
            <img src={maroonLogo} alt="logo" />
            <p className="label-font">Book Exchange </p>
          </div>
          <div className="authview-inputs border-rad">
            <div className="user-pass">
              <p className="light-tan">Username: </p>
              <input
                className="auth-input"
                type="text"
                value={this.state.userName}
                onChange={e => this.handleUsername(e)}
              />
            </div>
            <div className="user-pass">
              <p className="light-tan">Password:</p>
              <input
                className="auth-input"
                type="password"
                value={this.state.userPass}
                onChange={e => this.handlePassword(e)}
              />
            </div>
            <div className="auth-buttons">
              <button
                className="red-button"
                onClick={() => this.handleRegister()}
              >
                Register
              </button>
              <button className="red-button" onClick={() => this.handleLogin()}>
                Login{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default AuthView;
//REDUX
// export default connect(mapStateToProps, outputActions)();
