import decode from 'jwt-decode';
class helper {
  saveToken = response => {
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
  isTokenExpired = () => {
    const token = localStorage.getItem('access_token');
    try {
      const date = new Date(0);
      const decoded = decode(token);
      date.setUTCSeconds(decoded.exp);
      return date.valueOf() > new Date().valueOf();
    } catch (err) {
      return false;
    }
  };
  saveRememberMe = flag => {
    localStorage.setItem('remember_Me', flag);
  };
  removeToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };
}

const helpers = new helper();
export default helpers;
