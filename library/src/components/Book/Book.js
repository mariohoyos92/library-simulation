import React, { Component } from "react";

import DetailsButton from "../DetailsButton/DetailsButton";

//IMPORT CSS
import "./Book.css";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    //BIND FUNCTIONS HERE
  }

  //LIFESTYLE FUNCTIONS
  componentDidMount() {}

  //CUSTOM FUNCS

  //RENDER
  render() {
    const {
      title,
      author,
      src,
      img,
      inStock,
      handleRemoveFromCart,
      id,
      returnBook,
      deleteKey
    } = this.props;

    let secondaryButton;

    if (src === "browse") {
      secondaryButton = "";
    } else if (src === "cart") {
      secondaryButton = (
        <button onClick={() => handleRemoveFromCart(deleteKey)}>
          - Remove From Cart
        </button>
      );
    } else if (src === "shelf") {
      secondaryButton = (
        <button onClick={() => returnBook(id)}>- Return Book</button>
      );
    }

    return (
      <div className="book-container">
        <img src={img} alt="bookcover" />
        <div className="title-author">
          <p>{title}</p>
          <p>{author}</p>
        </div>
        <div>
          {src === "browse" || src === "cart" ? <p>In Stock: {inStock}</p> : ""}
          <DetailsButton id={id} />
          {secondaryButton}
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default Book;
