import decode from 'jwt-decode';
import once from 'lodash/once'
class helper {
    saveToken = (response, remeberMe) => {
        sessionStorage.setItem(
            'access_token',
            JSON.stringify(response.data.access_token)
        );
        sessionStorage.setItem(
            'refresh_token',
            JSON.stringify(response.data.refresh_token)
        );
        if (!remeberMe && !localStorage.getItem('access_token')) {
            return response;
        }
        localStorage.setItem(
            'access_token',
            JSON.stringify(response.data.access_token)
        );
        localStorage.setItem(
            'refresh_token',
            JSON.stringify(response.data.refresh_token)
        );
        return response;
    };
    getToken = () => {
        const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token')
        
        return {
            accessToken,
            refreshToken
        }
    }
    shareSessionStorage = (callback) => {
        callback = once(callback)
        window.addEventListener('storage', (event) => {
            if (event.key === 'getSessionStorage') {
                localStorage.setItem('sessionStorage',  JSON.stringify(sessionStorage))
                localStorage.removeItem('sessionStorage')
            } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
                const data = JSON.parse(event.newValue)
                for (let key in data) {
                    sessionStorage.setItem(key, data[key])
                }
                callback()
            }
        })
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token === null) {
            localStorage.setItem('getSessionStorage', true);
            localStorage.removeItem('getSessionStorage');
            setTimeout(callback, 500)
        } else {
            callback()
        }
    };
    isTokenExpired = () => {
        const token = this.getToken().accessToken;
        try {
            const date = new Date(0);
            const decoded = decode(token);
            date.setUTCSeconds(decoded.exp);
            return date.valueOf() > new Date().valueOf();
        } catch (err) {
            return false;
        }
    };
    removeToken = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
    };
}

const helpers = new helper();
export default helpers;
