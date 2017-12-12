import React from "react";

import { Switch, Route } from "react-router-dom";

import AuthView from "./components/AuthView/AuthView";
import BrowseView from "./components/BrowseView/BrowseView";

export default (
  <Switch>
    <Route exact path="/" component={AuthView} />
    <Route path="/browseview" component={BrowseView} />
  </Switch>
);
