import axios from "axios";
import * as actionTypes from "./actionTypes";

export const petition = () => {
  return {
    type: actionTypes.PETITION
  };
};

export const petitionAuth = (office, evidence, details, token) => {
    console.log(token);
  return dispatch => {
    dispatch(petition());
    const petitionDetails = {
        office: Number(office),
        evidence,
      bodyValue: details
    };
    const headers = {
      Authorization: `${token}`
    };
    axios
      .post(
        `https://politico-voting.herokuapp.com/api/v1/petitions`,
        petitionDetails,
        {headers}
      )
      .then(response => {
        console.log(response);
        // window.location.href = "/";
      })
      .catch(e => {
        console.log(e);
      });
  };
};
