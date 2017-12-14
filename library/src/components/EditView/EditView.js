import React, { Component } from "react";
import axios from "axios";

import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./EditView.css";

class EditView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    //BIND FUNCTIONS HERE
    this.handleTitle = this.handleTitle.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleEditBook = this.handleEditBook.bind(this);
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
          inStock: book.data.book_author
        });
      })
      .catch(console.log);
  }

  //CUSTOM FUNCS
  handleTitle(e) {
    this.setState({ title: e.target.value });
  }
  handleAuthor(e) {
    this.setState({ author: e.target.value });
  }
  handleDescription(e) {
    this.setState({ description: e.target.value });
  }
  handleGenre(e) {
    this.setState({ genre: e.target.value });
  }
  handleImg(e) {
    this.setState({ img: e.target.value });
  }
  handleEditBook() {
    axios
      .put("/api/books", {
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        genre: this.state.genre,
        img: this.state.img,
        id: this.state.id
      })
      .then(res => this.props.history.push("/browseview"))
      .catch(console.log);
  }
  //RENDER
  render() {
    return (
      <div>
        <Navigation />
        <button onClick={() => this.props.history.goBack()}> Go Back </button>
        Title:{" "}
        <input
          type="text"
          value={this.state.title}
          onChange={e => this.handleTitle(e)}
        />
        Author:{" "}
        <input
          type="text"
          value={this.state.author}
          onChange={e => this.handleAuthor(e)}
        />
        Genre:{" "}
        <select onChange={this.handleGenre}>
          <option value="none">None</option>
          <option value="Horror">Horror</option>
          <option value="Fiction">Fiction</option>
          <option value="NonFiction">NonFiction</option>
        </select>
        Description<input
          type="text-area"
          value={this.state.description}
          onChange={e => this.handleDescription(e)}
        />
        Img:{" "}
        <input
          type="text"
          value={this.state.img}
          onChange={e => this.handleImg(e)}
        />
        <img src={this.state.img} alt="book-cover" />
        <button onClick={this.handleEditBook}>Save Book</button>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default EditView;
