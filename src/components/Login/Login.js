import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";

import "./Login.css";

import * as actions from "../../store/actions/index";

class Login extends Component {
  state = {};

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <h3>Login</h3>
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={event => this.props.onAuth(event, email, password)}>
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              required
              onChange={this.onChange}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              required
              onChange={this.onChange}
            />
            <button className="submit" type="submit">
              Login
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (event, email, password) => {
      event.preventDefault();
      return dispatch(actions.auth(email, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

// export default Login;
