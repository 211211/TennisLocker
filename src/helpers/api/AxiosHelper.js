import axios from "axios";
// import helpers from "../helpers";
// import { getNewToken } from "../actions/redux/login";
// let pending = false;
axios.interceptors.request.use(
  config => {
    // const ref_token = localStorage.getItem("refresh_token");
    const newConfig = config;
    if (localStorage.getItem("access_token") != null) {
      // if (helpers.isTokenExpired() && !pending) {
      //   const res = getNewToken(ref_token);
      //   pending = true;
      // }
      newConfig.headers.Authorization = `Bearer ${localStorage
        .getItem("access_token")
        .slice(1, -1)}`;
    }
    return newConfig;
  },
  err => {
    return Promise.reject(err);
  }
);
// axios.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     const originalRequest = error.config;
//     if (error.code !== "ECONNABORTED" && error.response.status === 401) {
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         return axios
//           .post("/tokens/auth", {
//             refreshToken: axios(),
//             grantType: "refresh_token",
//             clientId: "website"
//           })
//           .then(response => {
//             localStorage.authentication = JSON.stringify(response.data);
//             axios();
//             return axios(originalRequest);
//           });
//       } else {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

function ApiRequest() {}

ApiRequest.prototype = {
  get: url => {
    return axios.get(url);
  },
  post: (url, data) => {
    return axios({
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      url,
      data
    });
  },
  put: (url, data) => {
    return axios({
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      url,
      data: JSON.stringify(data)
    });
  },
  delete: (url, data) => {
    return axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      url,
      data: JSON.stringify(data)
    });
  }
};
const api = new ApiRequest();

export default api;
