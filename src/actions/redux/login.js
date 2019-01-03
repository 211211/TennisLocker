import {
  LOGINING,
  LOGIN_FAIL,
  GET_REFRESH_TOKEN,
  GET_REFRESH_TOKEN_ERROR,
  LOGOUT
} from "../../constants/ActionTypes";
import api from "../../api/index";
import helpers from "../../helpers/index";
import config from "../../config";

// export function loginUsers(username, password) {
//   console.log(username, password);
//   const data = {
//     username: "portaladmin-tl@mailinator.com",
//     password: "Password123$",
//     grant_type: "password",
//     client_id: "mobile"
//   };
//   let formBody = [];
//   for (let property in data) {
//     let encodedKey = encodeURIComponent(property);
//     let encodedValue = encodeURIComponent(data[property]);
//     formBody.push(encodedKey + "=" + encodedValue);
//   }
//   formBody = formBody.join("&");
//   return dispatch => {
//     return api
//       .post(`${config.baseUrl}/oauth/token`, formBody)
//       .then(helpers.checkStatus)
//       .then(helpers.saveToken)
//       .then(
//         dispatch({
//           type: LOGINING,
//           isAuthenticated: true
//         })
//       )
//       .catch(error => {
//         console.log("error loginUser", error);
//       });
//   };
// }
export function loginUser(username, password) {
  const data = {
    username: username,
    password: password,
    grant_type: "password",
    client_id: "mobile"
  };
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: LOGINING, isAuthenticated: true });
      return success;
    }
    function onError(error) {
      dispatch(loginFail());
      console.log("error loginUsers", error);
      return error;
    }
    try {
      const success = await api.post(`${config.baseUrl}/oauth/token`, formBody);
      const checkStatus = await helpers.checkStatus(success);
      const saveToken = await helpers.saveToken(checkStatus);
      return onSuccess(saveToken);
    } catch (error) {
      return onError(error);
    }
  };
}
export function getRefreshToken(refresh_token) {
  // const remember_Me = localStorage.getItem("remember_Me");
  if (!refresh_token) {
    helpers.removeToken();
    return dispatch => {
      return dispatch({
        type: GET_REFRESH_TOKEN_ERROR,
        isAuthenticated: false
      });
    };
  }
  const data = {
    refresh_token: refresh_token,
    grant_type: "refresh_token",
    client_id: "mobile"
  };
  const formBody = Object.entries(data)
    .map(([key, value]) => {
      if (key === "refresh_token") {
        return encodeURIComponent(key) + "=" + value.replace(/['"«»]/g, "");
      } else {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      }
    })
    .join("&");
  return dispatch => {
    return api
      .post(`${config.baseUrl}/oauth/token`, formBody.toString())
      .then(helpers.checkStatus)
      .then(helpers.saveToken)
      .then(() => {
        dispatch({
          type: GET_REFRESH_TOKEN,
          isAuthenticated: true
        });
      })
      .catch(() => {
        dispatch({
          type: GET_REFRESH_TOKEN_ERROR,
          isAuthenticated: false
        });
      });
  };
}
export function logoutUser(tokenFlag) {
  if (tokenFlag) {
    helpers.removeToken();
  }
  return dispatch => {
    return dispatch({
      type: LOGOUT,
      isAuthenticated: false
    });
  };
}

export function loginFail() {
  return dispatch => {
    dispatch({
      type: LOGIN_FAIL
    });
  };
}
// export function getNewToken(refresh_token) {
//   // if (!refresh_token) {
//   //   return dispatch => {
//   //     return dispatch({
//   //       type: GET_REFRESH_TOKEN_ERROR,
//   //       isAuthenticated: false
//   //     });
//   //   };
//   // }
//   const data = {
//     refresh_token: refresh_token,
//     grant_type: "refresh_token",
//     client_id: "mobile"
//   };
//   const formBody = Object.entries(data)
//     .map(([key, value]) => {
//       if (key === "refresh_token") {
//         return encodeURIComponent(key) + "=" + value.replace(/['"«»]/g, "");
//       } else {
//         return encodeURIComponent(key) + "=" + encodeURIComponent(value);
//       }
//     })
//     .join("&");
//   return api
//     .post(`${config.baseUrl}/oauth/token`, formBody.toString())
//     .then(helpers.checkStatus)
//     .then(helpers.saveToken)
//     .then(response => {
//       return response.data.access_token;
//     })
//     .catch(e => {
//       console.log("error getNewToken", e);
//     });
// }
