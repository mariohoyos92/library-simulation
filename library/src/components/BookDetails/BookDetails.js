import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./BookDetails.css";

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      description: "",
      genre: "",
      id: "",
      img: "",
      inStock: ""
    };

    //BIND FUNCTIONS HERE
    this.delete = this.delete.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  //LIFESTYLE FUNCTIONS
  componentDidMount() {
    axios
      .get("/api/logstatus")
      .then(res => {
        !res.data.loggedin && this.props.history.push("/");
      })
      .catch(console.log);

    const bookId = this.props.location.pathname.slice(
      this.props.location.pathname.indexOf(":") + 1
    );

    axios
      .get(`/api/books/${bookId}`)
      .then(book => {
        this.setState({
          title: book.data.book_title,
          author: book.data.book_author,
          description: book.data.book_description,
          genre: book.data.book_genre,
          id: book.data.book_id,
          img: book.data.book_img,
          inStock: book.data.book_stock
        });
      })
      .catch(console.log);
  }

  //CUSTOM FUNCS
  delete() {
    axios
      .delete(`/api/book/${this.state.id}`)
      .then(response => {
        this.props.history.push("/browseview");
      })
      .catch(console.log);
  }

  addToCart() {
    let id = this.state.id;
    axios
      .post("/api/cart", { id: id })
      .then(response => {
        this.props.history.push("/browseview");
      })
      .catch(console.log);
  }

  //RENDER
  render() {
    return (
      <div>
        <Navigation />
        <div className="browser-view">
          <div>
            <button onClick={() => this.props.history.goBack()}>Go Back</button>
            <img src={this.state.img} alt="book-cover" />
            <p>Title: {this.state.title}</p>
            <p>Author: {this.state.author}</p>
            <p>Genre: {this.state.genre}</p>
            <p>In Stock: {this.state.inStock}</p>
            <p>Description: {this.state.description}</p>
            <Link to={`/edit/:${this.state.id}`}>
              <button> Edit</button>
            </Link>
            <button onClick={this.delete}>Delete</button>
            {this.state.inStock === "Yes" && (
              <button onClick={this.addToCart}>+ Add To Cart </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BookDetails;
