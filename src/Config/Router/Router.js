import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, SignUp, Profile, EditPost  } from "../../Containers";

function MainRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/edit-post" component={EditPost} />
      </Switch>
    </Router>
  );
}
export default MainRoute;
