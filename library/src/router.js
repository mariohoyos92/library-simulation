import React from "react";

import { Switch, Route } from "react-router-dom";

import AuthView from "./components/AuthView/AuthView";
import BrowseView from "./components/BrowseView/BrowseView";
import CartView from "./components/CartView/CartView";
import MyShelf from "./components/MyShelf/MyShelf";
import BookDetails from "./components/BookDetails/BookDetails";
import EditView from "./components/EditView/EditView";
import AddView from "./components/AddView/AddView";

export default (
  <Switch>
    <Route exact path="/" component={AuthView} />
    <Route path="/browseview" component={BrowseView} />
    <Route path="/cart" component={CartView} />
    <Route path="/shelf" component={MyShelf} />
    <Route path="/details" component={BookDetails} />
    <Route path="/edit" component={EditView} />
    <Route path="/add" component={AddView} />
  </Switch>
);
