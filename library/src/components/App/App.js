import React, { Component } from "react";
import router from "../../router";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="App">{router}</div>;
  }
}

export default App;
