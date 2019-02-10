import axios from 'axios';
import AuthHelper from '../AuthHelper';

// import { getNewToken } from "../actions/redux/login";
// let pending = false;
axios.interceptors.request.use(
    config => {
        // const ref_token = localStorage.getItem("refresh_token");
        const newConfig = config;
        const {accessToken} = AuthHelper.getToken()
        if (accessToken != null) {
            // if (helpers.isTokenExpired() && !pending) {
            //   const res = getNewToken(ref_token);
            //   pending = true;
            // }
            newConfig.headers.Authorization = `Bearer ${accessToken
                .slice(1, -1)}`;
        }
        return newConfig;
    },
    err => {
        return Promise.reject(err);
    }
);

// TODO: refresh token
axios.interceptors.response.use(
    function (response) {
        return response;
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

class ApiRequest {
    send({ url, method = 'get', headers = {}, data }) {
        return axios({
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            url,
            data
        }).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            }
            const error = new Error(response.statusText)
            error.response = response
            throw error
        }).catch(function (error) {
            if (error.response.status === 401) {
                AuthHelper.removeToken()
                window.location = '/'
            }
            throw error
        })
    }
    get(params) {
        return this.send({ ...params });
    }
    post(params) {
        return this.send({ ...params, method: 'post' })
    }
    put(params) {
        return this.send({ ...params, method: 'put' })
    }
    delete(params) {
        return this.send({ ...params, method: 'delete' })
    }
}

const api = new ApiRequest();

export default api;
