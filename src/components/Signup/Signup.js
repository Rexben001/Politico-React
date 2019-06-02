import React, { Component } from "react";

class Signup extends Component {
  render() {
    return (
      <div className="login">
        <h3>Signup</h3>
        <form>
          <label>Firstname</label>
          <input type="text" placeholder="Enter firstname" />
          <label>Lastname</label>
          <input type="text" placeholder="Enter lastname" />
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          <button className="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
