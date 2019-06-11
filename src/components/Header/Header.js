import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Header.css";

import * as actions from "../../store/actions/index";

class Header extends Component {
  checkStateLogin = props => {
    if (props) {
      return (
        <>
          <Link to="/petition">Petition</Link>
          <Link to="/vote">Vote</Link>
          <Link to="/profile">My Profile</Link>
          <Link to="/login" onClick={() => this.props.onLogout()}>
            Logout
          </Link>
        </>
      );
    }
    return (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    );
  };
  render() {
    return (
      <div className="Header">
        <Link to="/">Home</Link>
        {this.checkStateLogin(this.props.login)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.auth.login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      return dispatch(actions.logoutAuth());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
