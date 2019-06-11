import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import uuid from "uuid";

import { VoteStyle } from "./VoteStyle.jsx";
import * as actions from "../../store/actions/index";
import bgImg from "../../assets/bg-img.jpg";

class Vote extends Component {
  state = {
    candidate: []
  };

  componentDidMount() {
    const headers = {
      Authorization: this.props.token
    };
    axios
      .get("https://politico-voting.herokuapp.com/api/v1/populateVote", {
        headers
      })
      .then(response => this.setState({ candidate: response.data.data }))
      .catch(e => console.log(e));
  }
  render() {
    console.log(this.props);
    return this.props.login ? (
      <VoteStyle>
        <div className="sideDrawer">
          <p>Cast your Vote</p>
          <p>Political Parties</p>
          <p>Aspirant</p>
          <p>Election Result</p>
        </div>
        <div className="main-content">
          <div className="votes">
            {this.state.candidate.map(cand => (
              <div className="votes-div" key={uuid()}>
                <img src={cand.passporturl} alt="contestant" />
                <p>{`${cand.firstname} ${cand.lastname}`}</p>
                <p>FOR</p>
                <p>{cand.offices_name}</p>
                <button
                  onClick={() =>
                    this.props.voteForCand(
                      cand.office_id,
                      cand.createdby,
                      this.props
                    )
                  }
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        </div>
      </VoteStyle>
    ) : (
      <Redirect to="/" />
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
    voteForCand: (office, candidate, props) => {
      return dispatch(actions.voteAuth(office, candidate, props));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote);
