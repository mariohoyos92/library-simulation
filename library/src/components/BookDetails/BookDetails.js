import React, { Component } from "react";

import axios from "axios";

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
  }

  //LIFESTYLE FUNCTIONS
  componentDidMount() {
    const bookId = this.props.location.pathname.slice(
      this.props.location.pathname.indexOf(":") + 1
    );

    axios
      .get(`/api/books/${bookId}`)
      .then(book => {
        this.setState(
          {
            title: book.data.book_title,
            author: book.data.book_author,
            description: book.data.book_description,
            genre: book.data.book_genre,
            id: book.data.book_id,
            img: book.data.book_img,
            inStock: book.data.book_author
          },
          () => console.log(this.state)
        );
      })
      .catch(console.log);
  }

  //CUSTOM FUNCS

  //RENDER
  render() {
    return (
      <div>
        <Navigation />
        <div className="browser-view">
          <div>
            <button onClick={() => this.props.history.goBack()}>Go Back</button>
            <img src={this.state.img} />
            <p>Title: {this.state.title}</p>
            <p>Author: {this.state.author}</p>
            <p>Genre: {this.state.genre}</p>
            <p>In Stock: {this.state.inStock}</p>
            <p>Description: {this.state.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BookDetails;
