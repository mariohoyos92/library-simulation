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
          <div className="browser-card">
            <div className="details-header">
              <div>
                <p className="card-label secondary-font">Details</p>
              </div>
              <button
                className="border-rad"
                onClick={() => this.props.history.goBack()}
              >
                {"<<"} Go Back
              </button>
            </div>
            <div className="lightest-tan-back border-rad book-container">
              <img className="img-size" src={this.state.img} alt="book-cover" />
              <div className="details">
                <div>
                  <p>
                    <span className="bold secondary-font label red">
                      Title: {"  "}
                    </span>
                    {this.state.title}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="bold secondary-font label red">
                      Author:{" "}
                    </span>
                    {this.state.author}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="bold secondary-font label red">
                      Genre:{" "}
                    </span>
                    {this.state.genre}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="bold secondary-font label red">
                      In Stock:{" "}
                    </span>
                    {this.state.inStock}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="bold secondary-font label red">
                      Description: <br />
                    </span>
                    {this.state.description}
                  </p>
                </div>
              </div>
              <div className="book-right">
                <Link to={`/edit/:${this.state.id}`}>
                  <button className="red-button"> Edit</button>
                </Link>
                <button className="red-button" onClick={this.delete}>
                  Delete
                </button>
                {this.state.inStock === "Yes" && (
                  <button className="red-button" onClick={this.addToCart}>
                    + Add To Cart{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BookDetails;
