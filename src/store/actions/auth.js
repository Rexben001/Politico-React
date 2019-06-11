import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSucess = (token, login) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    login: login
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};
export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const loginDetails = {
      email,
      password
    };
    console.log(loginDetails);
    axios
      .post(
        `https://politico-voting.herokuapp.com/api/v1/auth/login`,
        loginDetails
      )
      .then(response => {
        console.log(response);
        window.localStorage.setItem("token", response.data.data[0].token);
        window.location.href = "/";
        dispatch(authSucess(response.data));
      })
      .catch(e => {
        console.log(e);
        dispatch(authFail(e));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.setItem("login", false);
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logoutAuth = () => {
  return dispatch => {
    dispatch(logout());
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const login = localStorage.getItem("login");
      dispatch(authSucess(token, login));
    }
  };
};
