import React, { Component } from "react";

import axios from "axios";

import Navigation from "../Navigation/Navigation";
import DetailsButton from "../DetailsButton/DetailsButton";

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
        console.log(res);
        !res.data.loggedin && this.props.history.push("/");
      })
      .catch(console.log);

    axios
      .get("/api/books")
      .then(res => {
        this.setState({ books: res });
      })
      .catch(console.log());
  }
  //CUSTOM FUNCS

  //RENDER
  render() {
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
              <button>+ Add New Book</button>
              <DetailsButton id="1" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BrowseView;
