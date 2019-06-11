import axios from "axios";
import * as actionTypes from "./actionTypes";

const vote = () => {
  return {
    type: actionTypes.VOTE
  };
};

export const voteAuth = (office, candidate, props) => {
  console.log(props.history);
  return dispatch => {
    dispatch(vote());
    const voteDetails = {
      office: Number(office),
      candidate: Number(candidate)
    };
    console.log(voteDetails);
    const headers = {
      Authorization: `${props.token}`
    };
    axios
      .post(`https://politico-voting.herokuapp.com/api/v1/votes`, voteDetails, {
        headers
      })
      .then(response => {
        // window.location.href = "/profile";
        props.history.push('/profile')
      })
      .catch(e => {
        console.log(e);
        props.history.push('/profile')
      });
  };
};
