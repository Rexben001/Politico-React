import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import propTypes from "prop-types";
import "./Userpage.css";

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      votedFor: [],
      profile: {},
      totalVotes: null
    };
  }
  componentDidMount() {
    this.getUserVote(
      "https://politico-voting.herokuapp.com/api/v1/votes/offices&candidates"
    );
    this.getUserProfile(
      "https://politico-voting.herokuapp.com/api/v1/users/profile"
    );
  }
  getUserVote = URL => {
    const headers = {
      Authorization: this.props.token
    };
    axios
      .get(URL, { headers })
      .then(response => {
        this.setState({
          votedFor: response.data.data,
          totalVotes: response.data.data.length
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  getUserProfile = URL => {
    const headers = {
      Authorization: this.props.token
    };
    axios
      .get(URL, { headers })
      .then(response => {
        this.setState({
          profile: response.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { username, email, passporturl } = this.state.profile;
    console.log(this.state.totalVotes);
    return (
      <div className="UserPage">
        <div className="profile">
          <img src={passporturl} alt="profile" />
          <h3>{username}</h3>
          <p>{email}</p>
          <p>Total vote: {this.state.totalVotes}</p>
        </div>
        <div className="cand-table">
          <h2>List of Political parties and offices that you have voted</h2>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Office</th>
              </tr>
            </thead>
            <tbody>
              {this.state.votedFor.map((vote, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {vote.firstname} {vote.lastname}
                  </td>
                  <td>{vote.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

UserPage.propTypes = {
  token: propTypes.string.isRequired
};

// Give it a default props
UserPage.defaultProps = {
  token: "e6578909"
};
export default connect(mapStateToProps)(UserPage);
