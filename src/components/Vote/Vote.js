import React, { Component } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Link,
  Route
} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import uuid from "uuid";

import { VoteStyle } from "./VoteStyle.jsx";
import * as actions from "../../store/actions/index";
import VoteFor from "./VoteFor";
import Spinner from "../Spinner/Spinner";

class Vote extends Component {
  state = {
    candidate: [],
    parties: [],
    offices: [],
    results: [],
    errorMessage: "",
    selected: true,
    isLoading: true
  };

  componentDidMount() {
    const headers = {
      Authorization: this.props.token
    };
    this.loadVotes(
      "https://politico-voting.herokuapp.com/api/v1/populateVote",
      headers
    );
    this.loadParties(
      "https://politico-voting.herokuapp.com/api/v1/parties",
      headers
    );
    this.loadOffices(
      "https://politico-voting.herokuapp.com/api/v1/offices",
      headers
    );
  }

  loadVotes = (url, headers) => {
    axios
      .get(url, {
        headers
      })
      .then(response => this.setState({ candidate: response.data.data }))
      .catch(e => console.log(e))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadParties = (url, headers) => {
    axios
      .get(url, { headers })
      .then(response => this.setState({ parties: response.data.data }))
      .catch(e => console.log(e));
  };

  loadOffices = (url, headers) => {
    axios
      .get(url, { headers })
      .then(response => this.setState({ offices: response.data.data }))
      .catch(e => console.log(e));
  };

  loadResults = event => {
    const headers = {
      Authorization: this.props.token
    };
    axios
      .get(
        `https://politico-voting.herokuapp.com/api/v1/office/${
          event.target.value
        }/result`,
        {
          headers
        }
      )
      .then(response =>
        this.setState({
          results: response.data.data,
          errorMessage: "",
          selected: false
        })
      )
      .catch(e => {
        this.setState({ errorMessage: e.response.data.message });
      });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return this.props.login ? (
      <Router>
        <VoteStyle>
          <div className="sideDrawer">
            <Link to="/vote/">Cast your Vote</Link>
            <Link to="/vote/parties">Political Parties</Link>
            <Link to="/vote/aspirants">Aspirant</Link>
            <Link to="/vote/results">Election Result</Link>
          </div>
          <div className="main-content">
            <Route
              exact
              path="/vote/"
              component={() =>
                this.state.isLoading ? (
                  <Spinner />
                ) : (
                  <VoteFor
                    candidate={this.state.candidate}
                    details={this.props}
                    voteForCand={this.props.voteForCand}
                  />
                )
              }
            />
            <Route
              path="/vote/parties"
              component={() => (
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Flag</th>
                      <th>Name</th>
                      <th>Hq. Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.parties.map((party, idx) => (
                      <tr key={uuid()}>
                        <td>{idx + 1}</td>
                        <td>
                          <img src={party.logourl} alt="Logo" />
                        </td>
                        <td>{party.name}</td>
                        <td>{party.hqaddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
            <Route
              path="/vote/aspirants"
              component={() => (
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Name</th>
                      <th>Party</th>
                      <th>Office</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.candidate.map((aspirant, idx) => (
                      <tr key={uuid()}>
                        <td>{idx + 1}</td>
                        <td>{`${aspirant.firstname} ${aspirant.lastname}`}</td>
                        <td>{aspirant.name}</td>
                        <td>{aspirant.offices_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
            <Route
              path="/vote/results"
              component={() => (
                <div>
                  <div>
                    <select onChange={this.loadResults}>
                      <option disabled selected={this.state.selected}>
                        Select Office
                      </option>

                      {this.state.offices.map(office => (
                        <option value={office.office_id} key={office.office_id}>
                          {office.name} {office.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {this.state.errorMessage ? (
                    <div>No votes for the office</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Office</th>
                          <th>Total Vote counts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.results.map((result, idx) => (
                          <tr key={uuid()}>
                            <td>{idx + 1}</td>
                            <td>
                              <img src={result.passporturl} alt="Logo" />
                            </td>
                            <td>
                              {result.firstname} {result.lastname}
                            </td>
                            <td>{result.name}</td>
                            <td>{result.results}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            />
          </div>
        </VoteStyle>
      </Router>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    login: state.auth.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voteForCand: (office, candidate, props) => {
      return dispatch(actions.voteAuth(office, candidate, props));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote);
