import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.test = this.test.bind(this);
  }
  render() {
    return <div className="App" />;
  }
}

export default App;
