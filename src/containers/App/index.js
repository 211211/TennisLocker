import React from "react";
import { Link, Route, Router, Switch, Redirect } from "react-router-dom";
import classnames from "classnames";
import "./app.scss";
// import { logoutUser } from "../../actions/redux/login";
import SVG from "react-inlinesvg";
import SelectFilter from "../../components/SelectFilter";
import SelectDate from "../../components/SelectDate";
import nabTabs from "../../helpers/navTabs";
import logo from "../../assets/images/TennisLockerInternalPortal/logo.svg";
import signOut from "../../assets/images/TennisLockerInternalPortal/signOut.png";
import { logoutUser } from "../../actions/redux/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faBell, faComment } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveFilter: false,
      isMenuShow: false
    };
  }

  toggleFilter = () => {
    this.setState({ isActiveFilter: !this.state.isActiveFilter });
  };

  logOut = () => {
    logoutUser(true);
    window.location.reload();
  };

  toggleMenuShow = (ctx, isHide) => {
    console.log("isHide", isHide);
    if (isHide) {
      this.setState({ isMenuShow: false });
    } else {
      this.setState({ isMenuShow: !this.state.isMenuShow });
    }
  };
  render() {
    return (
      <div className="app-wrapper">
        <header className="header">
          <div className="header_logo">
            <img src={logo} alt="logo" />
          </div>
          <div
            className={classnames(
              "burger",
              this.state.isMenuShow ? "is-active" : ""
            )}
            onClick={this.toggleMenuShow}
          >
            <span />
            <span />
            <span />
          </div>
          <div className="header_search">
            <SelectFilter />
          </div>
          <div
            className={classnames(
              "header_date",
              this.state.isActiveFilter ? "is-show" : ""
            )}
          >
            <div className="header_search--mobile">
              <SelectFilter />
            </div>
            <SelectDate />
          </div>
          <div
            className={classnames(
              "header_filter",
              this.state.isActiveFilter ? "is-active" : ""
            )}
            onClick={this.toggleFilter}
          >
            <FontAwesomeIcon icon={faFilter} />
          </div>
          <div className="header_notif header_mess-wrap">
            {/*<img src={ball} alt="ball" />*/}
            <FontAwesomeIcon icon={faBell} />
            <span className="header_notif-title header_mess-title">
              Notifications
            </span>
          </div>
          <div className="header_message header_mess-wrap">
            <FontAwesomeIcon icon={faComment} />
            {/*<img src={messageImg} alt="message" />*/}
            <span className="header_message-title header_mess-title">
              Messages
            </span>
          </div>
          <div className="header_avatar" onClick={this.logOut}>
            <img src={signOut} alt="Ava" />
          </div>
        </header>
        <div
          className={classnames(
            "content",
            this.state.isMenuShow ? "overlayed" : ""
          )}
          onClick={this.toggleMenuShow.bind(this, true)}
        >
          <nav
            className={classnames(
              "nav",
              this.state.isMenuShow ? "is-show" : ""
            )}
          >
            {nabTabs.navigationTabs.map(item => {
              return (
                <div
                  key={item.name}
                  className={
                    this.props.location.pathname === item.urlName
                      ? "activeNav"
                      : ""
                  }
                >
                  <Link className="nav-block" to={item.urlName}>
                    <div className="nav-block-content">
                      <SVG src={item.iconSvg} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </nav>
          <div className="section">
            <Router history={this.props.history}>
              <Switch>
                {nabTabs.navigationTabs.map(item => {
                  return (
                    <Route
                      key={item.name}
                      path={item.urlName}
                      render={props => <item.comFile {...props} />}
                    />
                  );
                })}
                <Redirect to="/dashboard" exact />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
