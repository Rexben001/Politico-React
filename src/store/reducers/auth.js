import * as actionTypes from "../actions/actionTypes";

const initialStae = {
  token: null,
  userId: null,
  error: null,
  isLoading: null,
  login: !!localStorage.getItem("token"),
  admin: false
};

const reducer = (state = initialStae, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case actionTypes.AUTH_SUCCESS:
      window.localStorage.setItem("login", true);
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        isLoading: false,
        login: true,
        admin: action.admin
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case actionTypes.AUTH_LOGOUT:
      //   saveLocally(null, null, false);

      return {
        ...state,
        token: null,
        userId: null,
        login: false,
        admin: null
      };
    default:
      return state;
  }
};

// const saveLocally = (token, userId, login) => {
//   window.localStorage.setItem("token", token);
//   window.localStorage.setItem("userId", userId);
//   window.localStorage.setItem("login", login);
// };

export default reducer;
