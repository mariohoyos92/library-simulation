import React, { Component } from "react";

import axios from "axios";

import Navigation from "../Navigation/Navigation";

import Book from "../Book/Book";

//IMPORT CSS
import "./BrowseView.css";

class BrowseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };

    //BIND FUNCTIONS HERE
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
        console.log(res);
        this.setState({ books: res.data });
      })
      .catch(console.log());
  }
  //CUSTOM FUNCS

  //RENDER
  render() {
    const bookList =
      this.state.books.length > 0 &&
      this.state.books.map(item => {
        return (
          <Book
            title={item.book_title}
            author={item.book_author}
            img={item.book_img}
            inStock={item.book_stock}
            id={item.book_id}
            src="browse"
          />
        );
      });

    return (
      <div>
        <Navigation />
        <div className="browser-view">
          <div className="browser-card">
            <div className="browser-header">
              <p> Browse Inventory</p>
              <div className="filter-container">
                In Stock: <input type="checkbox" />
                Out Of Stock:<input type="checkbox" />
                Genre:{" "}
                <select>
                  <option value="none">None</option>
                  <option value="Horror">Horror</option>
                  <option value="Mystery">Mystery</option>
                  <option value="NonFiction">NonFiction</option>
                </select>
              </div>
            </div>
            <div className="browser-display" />
            <div className="browser-footer">
              {bookList}
              <button>+ Add New Book</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BrowseView;
