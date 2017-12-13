import React, { Component } from "react";

import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./Book.css";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    //BIND FUNCTIONS HERE
  }

  //LIFESTYLE FUNCTIONS

  //CUSTOM FUNCS

  //RENDER
  render() {
    const { title, author, src, img, inStock } = this.props;

    return <div className="book-container" />;
  }
}

//EXPORT COMPONENT
export default Book;
