import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

import Book from "../Book/Book";

//IMPORT CSS
import "./BrowseView.css";

class BrowseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      inStock: false,
      outStock: false,
      genre: ""
    };

    //BIND FUNCTIONS HERE
    this.handleInStock = this.handleInStock.bind(this);
    this.handleOutStock = this.handleOutStock.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
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
      .get("/api/books")
      .then(res => {
        this.setState({ books: res.data });
      })
      .catch(console.log());
  }
  //CUSTOM FUNCS

  handleInStock() {
    this.setState({ inStock: !this.state.inStock });
  }

  handleOutStock() {
    this.setState({ outStock: !this.state.outStock });
  }

  handleGenre(e) {
    this.setState({ genre: e.target.value });
  }

  //RENDER
  render() {
    let bookList =
      this.state.books.length > 0 &&
      this.state.books.map(item => {
        return (
          <Book
            key={Math.random()}
            title={item.book_title}
            author={item.book_author}
            img={item.book_img}
            inStock={item.book_stock}
            id={item.book_id}
            src="browse"
          />
        );
      });

    this.state.genre !== "none" &&
      this.state.genre &&
      (bookList = this.state.books
        .filter(book => book.book_genre === this.state.genre)
        .map(item => {
          return (
            <Book
              key={Math.random()}
              title={item.book_title}
              author={item.book_author}
              img={item.book_img}
              inStock={item.book_stock}
              id={item.book_id}
              src="browse"
            />
          );
        }));

    this.state.inStock &&
      (bookList = this.state.books
        .filter(book => book.book_stock === "Yes")
        .map(item => {
          return (
            <Book
              key={Math.random()}
              title={item.book_title}
              author={item.book_author}
              img={item.book_img}
              inStock={item.book_stock}
              id={item.book_id}
              src="browse"
            />
          );
        }));

    this.state.outStock &&
      (bookList = this.state.books
        .filter(book => book.book_stock === "No")
        .map(item => {
          return (
            <Book
              key={Math.random()}
              title={item.book_title}
              author={item.book_author}
              img={item.book_img}
              inStock={item.book_stock}
              id={item.book_id}
              src="browse"
            />
          );
        }));

    this.state.inStock &&
      this.state.genre !== "none" &&
      this.state.genre &&
      (bookList = this.state.books
        .filter(
          book =>
            book.book_stock === "Yes" && book.book_genre === this.state.genre
        )
        .map(item => {
          return (
            <Book
              key={Math.random()}
              title={item.book_title}
              author={item.book_author}
              img={item.book_img}
              inStock={item.book_stock}
              id={item.book_id}
              src="browse"
            />
          );
        }));

    this.state.outStock &&
      this.state.genre !== "none" &&
      this.state.genre &&
      (bookList = this.state.books
        .filter(
          book =>
            book.book_stock === "No" && book.book_genre === this.state.genre
        )
        .map(item => {
          return (
            <Book
              key={Math.random()}
              title={item.book_title}
              author={item.book_author}
              img={item.book_img}
              inStock={item.book_stock}
              id={item.book_id}
              src="browse"
            />
          );
        }));

    return (
      <div>
        <Navigation />
        <div className="browser-view">
          <div className="browser-card">
            <div className="browser-header">
              <p> Browse Inventory</p>
              <div className="filter-container">
                In Stock: <input type="checkbox" onClick={this.handleInStock} />
                Out Of Stock:<input
                  type="checkbox"
                  onClick={this.handleOutStock}
                />
                Genre:{" "}
                <select onChange={this.handleGenre}>
                  <option value="none">None</option>
                  <option value="Horror">Horror</option>
                  <option value="Fiction">Fiction</option>
                  <option value="NonFiction">NonFiction</option>
                </select>
              </div>
            </div>
            <div className="browser-display" />
            <div className="browser-footer">
              {bookList}
              <Link to="/add">
                <button>+ Add New Book</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BrowseView;
