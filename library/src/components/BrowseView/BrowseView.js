import React, { Component } from "react";

import Navigation from "../Navigation/Navigation";

//IMPORT CSS
import "./BrowseView.css";

class BrowseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    //BIND FUNCTIONS HERE
  }

  //LIFESTYLE FUNCTIONS

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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//EXPORT COMPONENT
export default BrowseView;
