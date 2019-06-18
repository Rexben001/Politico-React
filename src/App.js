import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import * as actions from "./store/actions/index";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Admin from './components/Admin/Admin';
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
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/admin" component={Admin} />
              <Route
                path="/petition"
                component={Petition}
              />
              <Route
                path="/profile"
                component={UserPage}
              />
              <Route
                exact
                path="/vote"
                render={props => <Vote {...props}/>}
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
