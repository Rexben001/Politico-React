import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import * as actions from "./store/actions/index";
import PrivateRoute from "./PrivateRoute";

import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Petition from "./components/Petition/Petition";
import Vote from "./components/Vote/Vote";
import UserPage from "./components/UserPage/UserPage";
import Footer from "./components/Footer/Footer";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute
                path="/petition"
                component={Petition}
                login={this.props.login}
              />
              <PrivateRoute
                path="/profile"
                component={UserPage}
                login={this.props.login}
              />
              <Route
                path="/vote"
                render={props => <Vote {...props} login={this.props.login} />}
              />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    login: state.auth.login,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
