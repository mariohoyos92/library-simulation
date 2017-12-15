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
  componentDidMount() {
    axios
      .get("/api/logstatus")
      .then(res => {
        !res.data.loggedin && this.props.history.push("/");
      })
      .catch(console.log);
  }

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

  //RENDER
  render() {
    return (
      <div>
        <Navigation />
        <div className="browser-view">
          <div className="browser-card">
            <div className="details-header">
              <div>
                <p className="card-label secondary-font bold">Add A Book</p>
              </div>
              <button
                className="border-rad"
                onClick={() => this.props.history.goBack()}
              >
                {"<<"} Go Back
              </button>
            </div>
            <div className="add-edit">
              <div className="add-edit-left">
                Img URL: <br />
                <br />
                <input
                  type="text"
                  value={this.state.img}
                  onChange={e => this.handleImg(e)}
                />
                <div className="img-preview">
                  {this.state.img && (
                    <img
                      className="img-size"
                      src={this.state.img}
                      alt="book-cover"
                    />
                  )}
                </div>
              </div>
              <div className="add-edit-right">
                <div className="add-edit-label">
                  Title:{" "}
                  <input
                    type="text"
                    value={this.state.title}
                    onChange={e => this.handleTitle(e)}
                  />
                </div>
                <div className="add-edit-label">
                  Author:{" "}
                  <input
                    type="text"
                    value={this.state.author}
                    onChange={e => this.handleAuthor(e)}
                  />
                </div>
                <div className="add-edit-label">
                  Genre:{" "}
                  <select onChange={this.handleGenre}>
                    <option value="none">None</option>
                    <option value="Horror">Horror</option>
                    <option value="Fiction">Fiction</option>
                    <option value="NonFiction">NonFiction</option>
                  </select>
                </div>
                <span className="add-edit-label">Description:</span>
                <textarea
                  className="area"
                  cols="10"
                  value={this.state.description}
                  onChange={e => this.handleDescription(e)}
                />
                <button className="red-button" onClick={this.handleAddBook}>
                  {" "}
                  + Add Book to Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default AddView;
