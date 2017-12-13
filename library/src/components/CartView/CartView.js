import React, { Component } from "react";
import axios from "axios";

import Book from "../Book/Book";
import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./CartView.css";

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };

    //BIND FUNCTIONS HERE
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  //LIFESTYLE FUNCTIONS
  componentDidMount() {
    axios
      .get("/api/cart")
      .then(response => {
        this.setState({ cart: response.data });
      })
      .catch(console.log);
  }

  //CUSTOM FUNCS
  handleRemoveFromCart(key) {
    axios
      .delete(`/api/cart/${key}`)
      .then(response => {
        console.log(response);
        this.setState({ cart: response.data });
      })
      .catch(console.log);
  }

  //RENDER
  render() {
    const cartDisplay =
      this.state.cart.length > 0 &&
      this.state.cart.map(item => {
        return (
          <Book
            key={this.state.cart.indexOf(item)}
            title={item.book_title}
            author={item.book_author}
            img={item.book_img}
            inStock={item.book_stock}
            id={item.book_id}
            src="cart"
            handleRemoveFromCart={this.handleRemoveFromCart}
          />
        );
      });
    return (
      <div>
        <Navigation />
        <div className="browser-view">{cartDisplay}</div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default CartView;
