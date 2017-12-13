import React, { Component } from "react";
import axios from "axios";

import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./AddView.css";

class AddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      genre: "",
      description: "",
      img: ""
    };

    //BIND FUNCTIONS HERE
    this.handleTitle = this.handleTitle.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  //LIFESTYLE FUNCTIONS
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
  handleAddBook() {
    axios
      .post("/api/books", {
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        inStock: "Yes",
        genre: this.state.genre,
        img: this.state.img
      })
      .then(res => this.props.history.push("/browseview"))
      .catch(console.log);
  }

  //CUSTOM FUNCS

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
        <button onClick={this.handleAddBook}> + Add Book to Inventory</button>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default AddView;
