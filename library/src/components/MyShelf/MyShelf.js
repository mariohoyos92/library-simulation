import React, { Component } from "react";

import axios from "axios";

import Book from "../Book/Book";
import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./MyShelf.css";

class MyShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };

    //BIND FUNCTIONS HERE
    this.returnBook = this.returnBook.bind(this);
  }

  //LIFESTYLE FUNCTIONS
  componentDidMount() {
    axios
      .get("/api/logstatus")
      .then(res => {
        !res.data.loggedin && this.props.history.push("/");
      })
      .catch(console.log);
    axios
      .get("/api/shelf")
      .then(books => {
        this.setState({ books: books.data });
      })
      .catch(console.log);
  }

  //CUSTOM FUNCS
  returnBook(id) {
    axios
      .post("/api/shelf", { id: id })
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(console.log);
  }

  //RENDER
  render() {
    const shelfDisplay =
      this.state.books.length > 0 ? (
        this.state.books.map(item => {
          return (
            <Book
              key={this.state.books.indexOf(item)}
              deleteKey={this.state.books.indexOf(item)}
              title={item.book_title}
              author={item.book_author}
              img={item.book_img}
              inStock={item.book_stock}
              id={item.book_id}
              src="shelf"
              returnBook={this.returnBook}
            />
          );
        })
      ) : (
        <p>Your Shelf Is Empty!</p>
      );
    return (
      <div>
        <Navigation />
        <div className="browser-view">{shelfDisplay}</div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default MyShelf;
