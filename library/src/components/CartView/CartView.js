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
    this.checkout = this.checkout.bind(this);
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
        this.setState({ cart: response.data });
      })
      .catch(console.log);
  }

  checkout() {
    let idArray = [];
    this.state.cart.forEach(element => {
      idArray.push(element.id);
    });
    axios
      .post("/api/checkout", { idArray: idArray })
      .then(res => {
        this.props.history.push("/shelf");
      })
      .catch(console.log);
  }
  //RENDER
  render() {
    const cartDisplay =
      this.state.cart.length > 0 ? (
        this.state.cart.map(item => {
          return (
            <Book
              key={this.state.cart.indexOf(item)}
              deleteKey={this.state.cart.indexOf(item)}
              title={item.book_title}
              author={item.book_author}
              img={item.book_img}
              inStock={item.book_stock}
              id={item.book_id}
              src="cart"
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
          );
        })
      ) : (
        <p>Your Cart Is Empty!</p>
      );
    return (
      <div>
        <Navigation />
        <div className="browser-view">
          {cartDisplay}
          {this.state.cart.length > 0 && (
            <button onClick={this.checkout}>Checkout</button>
          )}
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default CartView;
