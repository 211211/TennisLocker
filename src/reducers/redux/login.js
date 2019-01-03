import {
  LOGINING,
  LOGIN_FAIL,
  GET_REFRESH_TOKEN,
  GET_REFRESH_TOKEN_ERROR,
  LOGOUT
} from "../../constants/ActionTypes";

const initial = {
  isAuthenticated: null,
  errorFlag: false
};

const login = (state = initial, action) => {
  // const { data } = action;
  switch (action.type) {
    case LOGINING:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        errorFlag: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        errorFlag: true
      };
    case GET_REFRESH_TOKEN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    case GET_REFRESH_TOKEN_ERROR:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    default:
      return state;
  }
};
export default login;
