import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions/redux/login";
import classnames from "classnames";
import "./login.scss";
import { Formik } from "formik";
import logo from "../../assets/images/logo.svg";
import Vector from "../../assets/images/Vector.svg";
// import helpers from "../../helpers";

const mapStateToProps = ({ login }) => ({
  login
});
const mapDispatchToProps = dispatch => ({
  loginUser: (login, password) => dispatch(loginUser(login, password))
});
async function onSubmitLogin(func, setSubmitting) {
  await func;
  await setSubmitting(false);
}
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: false
    };
  }
  changeStateCheckbox = () => {
    this.setState({ img: !this.state.img });
  };
  render() {
    if (this.props.login.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const imgChech = this.state.img ? <img src={Vector} alt="Vector" /> : "";
    // helpers.saveRememberMe(String(this.state.img));
    return (
      <div className="login">
        <div className="login-block">
          <img className="login-block_logo" src={logo} alt="logo" />
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = "";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              onSubmitLogin(
                this.props.loginUser(values.email, values.password),
                setSubmitting
              );
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <div
                  className={
                    errors.email && touched.email && errors.email
                      ? "errorImg"
                      : "blockImg"
                  }
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div
                  className={
                    errors.password && touched.password && errors.password
                      ? "errorImg"
                      : "blockImg"
                  }
                >
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                </div>
                {this.props.login.errorFlag && (
                  <p className={classnames("error_login")}>
                    Invalid login or password
                  </p>
                )}

                <div className="checkbox-block">
                  <span
                    onClick={this.changeStateCheckbox}
                    className="checkbox-block-input"
                  >
                    {imgChech}
                  </span>
                  <span className="checkbox-block-title">Remember me</span>
                  <div className={isSubmitting ? "loader" : ""}>
                    <svg
                      className={isSubmitting ? "circular-loader" : "circular"}
                      viewBox="25 25 50 50"
                    >
                      <circle
                        className="path"
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting}>
                  SIGN IN
                </button>
              </form>
            )}
          </Formik>
          <div className="login__forgotPass">
            <span>Forgot password?</span>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
