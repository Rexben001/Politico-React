import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

class Petition extends Component {
  state = {};

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { office, details, evidence } = this.state;
    return (
      <div className="login">
        <h3>Petition</h3>
        <form
          onSubmit={event =>
            this.props.onPetition(
              event,
              office,
              evidence,
              details,
              this.props.token
            )
          }
        >
          <label>Office</label>
          <input
            type="text"
            placeholder="Enter office"
            name="office"
            required
            onChange={this.onChange}
          />
          <label>Evidence</label>
          <input
            type="text"
            placeholder="Enter evidence"
            name="evidence"
            required
            onChange={this.onChange}
          />
          <label>Details</label>

          <input
            type="text"
            placeholder="Enter details"
            name="details"
            required
            onChange={this.onChange}
          />

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
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
    onPetition: (event, office, evidence, details, token) => {
      event.preventDefault();
      return dispatch(actions.petitionAuth(office, evidence, details, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Petition);
