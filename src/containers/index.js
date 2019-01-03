import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getRefreshToken } from "../actions/redux/login";
import App from "./App";

const mapStateToProps = ({ login }) => ({
  login
});
const mapDispatchToProps = dispatch => ({
  getRefreshToken: ref_token => dispatch(getRefreshToken(ref_token))
});

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const ref_token = localStorage.getItem("refresh_token");
    if (!this.props.login.isAuthenticated) {
      this.props.getRefreshToken(ref_token);
    }
  }
  render() {
    if (this.props.login.isAuthenticated === false) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Route path="/" render={props => <App {...props} />} />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
