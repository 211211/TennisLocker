import React from "react";
import { connect } from "react-redux";
import "./SignIn.scss";
import { Formik } from "formik";
import logo from "../../assets/images/TennisLockerInternalPortal/logo.svg";
import Vector from "../../assets/images/TennisLockerInternalPortal/Vector.svg";
// import helpers from "../../helpers";
import {
    NotificationContainer,
    NotificationManager
} from "react-notifications";

import { hideMessage, showAuthLoader, userSignIn } from "../../actions/Auth";
import CircularProgress from "../../components/CircularProgress";

async function onSubmitLogin(func, setSubmitting) {
    await func;
    await setSubmitting(false);
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: false
        };
    }

    componentDidUpdate() {
        if (this.props.showMessage) {
            setTimeout(() => {
                this.props.hideMessage();
            }, 100);
        }

        const {authUser, history} = this.props
        if (authUser && authUser.access_token) {
            history.push("/");
        }
    }

    changeStateCheckbox = () => {
        this.setState({ img: !this.state.img });
    };

    render() {
        const imgChech = this.state.img ? <img src={Vector} alt="Vector" /> : "";
        const { showMessage, loader, alertMessage } = this.props;
        // helpers.saveRememberMe(String(this.state.img));
        return (
            <React.Fragment>
                <div className="login">
                    <div className="login-block">
                        <img className="login-block_logo" src={logo} alt="logo" />
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validate={values => {
                                let errors = {};
                                if (!values.email) {
                                    errors.email = "";
                                } else if (!EMAIL_REGEX.test(values.email)) {
                                    errors.email = "Invalid email address";
                                }
                                return errors;
                            }}
                            onSubmit={({ email, password }, { setSubmitting }) => {
                                this.props.showAuthLoader();
                                onSubmitLogin(
                                    this.props.userSignIn({ email, password }),
                                    setSubmitting
                                );

                                // onSubmitLogin(
                                //   this.props.loginUser(values.email, values.password),
                                //   setSubmitting
                                // );
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
                                                errors.email && touched.email ? "errorImg" : "blockImg"
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
                                                errors.password && touched.password
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
                                            {errors.password && touched.password
                                                ? errors.password
                                                : null}
                                        </div>
                                        {
                                            // this.props.login.errorFlag && (
                                            //   <p className={classnames("error_login")}>
                                            //     Invalid login or password
                                            // </p>
                                            // )
                                        }

                                        <div className="checkbox-block">
                                            <span
                                                onClick={this.changeStateCheckbox}
                                                className="checkbox-block-input"
                                            >
                                                {imgChech}
                                            </span>
                                            <span className="checkbox-block-title">Remember me</span>
                                            {
                                                // <div className={isSubmitting ? "loader" : ""}>
                                                //   <svg
                                                //     className={isSubmitting ? "circular-loader" : "circular"}
                                                //     viewBox="25 25 50 50"
                                                //   >
                                                //     <circle
                                                //       className="path"
                                                //       cx="50"
                                                //       cy="50"
                                                //       r="20"
                                                //       fill="none"
                                                //       strokeWidth="2"
                                                //       strokeMiterlimit="10"
                                                //     />
                                                //   </svg>
                                                // </div>
                                            }
                                        </div>
                                        <button type="submit" disabled={isSubmitting}>SIGN IN</button>
                                    </form>
                                )}
                        </Formik>
                        <div className="login__forgotPass">
                            <span>Forgot password?</span>
                        </div>
                    </div>

                    {loader && (
                        <div className="loader-view">
                            <CircularProgress />
                        </div>
                    )}
                    {
                        showMessage && NotificationManager.error(alertMessage)
                    }
                    <NotificationContainer />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { loader, alertMessage, showMessage, authUser } = auth;
    return { loader, alertMessage, showMessage, authUser };
};

export default connect(
    mapStateToProps,
    {
        userSignIn,
        hideMessage,
        showAuthLoader
    }
)(SignIn);
