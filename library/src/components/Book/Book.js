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
      <div className="book-container lightest-tan-back border-rad">
        <img className="img-size" src={img} alt="bookcover" />
        <div className="title-author">
          <p className="title">{title}</p>
          <p className="author">By: {author}</p>
        </div>
        <div className="book-right">
          {src === "browse" || src === "cart" ? (
            <div>
              <p>
                <span className="bold secondary-font">In Stock:</span> {inStock}
              </p>
            </div>
          ) : (
            ""
          )}
          <div>
            <DetailsButton id={id} />
          </div>
          {secondaryButton}
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default Book;
