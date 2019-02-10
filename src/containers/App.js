import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl'
import 'react-big-calendar/lib/less/styles.less';
import 'react-toggle-switch/dist/css/switch.min.css';
import 'rc-drawer/assets/index.css';
import 'styles/bootstrap.scss'
import 'styles/app.scss';
import 'styles/app-rtl.scss';
import AppLocale from '../lngProvider';

import MainApp from '../app/index';
import SignIn from './SignIn/index';
import {
    setInitUrl,
    userRefreshToken,
    showAuthLoader,
} from '../actions/Auth';
import AuthHelper from '../helpers/AuthHelper';
import asyncComponent from '../util/asyncComponent';
import CircularProgress from '../components/CircularProgress';

const redirectToHomePage = (initURL) => {
    if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return (<Redirect to={'/app/dashboard'} />);
    }

    return (<Redirect to={initURL} />);
}

const RestrictedRoute = ({ component: Component, authUser, ...rest }) =>
    <Route
        {...rest}
        render={props => authUser
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: '/signin',
                    state: { from: props.location }
                }}
            />}
    />;

class App extends Component {

    componentWillMount() {
        const { initURL, setInitUrl, userRefreshToken, history, showAuthLoader } = this.props
        if (initURL === '') {
            setInitUrl(history.location.pathname);
        }

        const {accessToken, refreshToken} = AuthHelper.getToken()
        if (accessToken) {
            if (refreshToken && typeof userRefreshToken === 'function') {
                showAuthLoader()
                userRefreshToken()
            }
        }
    }

    render() {
        const { match, location, locale, initURL, isDirectionRTL, authUser, loader } = this.props;
        if (loader) {
            return (
                <div className="loader-view">
                    <CircularProgress />
                </div>
            )
        }

        if (location.pathname === '/') {
            if (authUser === null || !authUser || authUser === '') {
                return (<Redirect to={'/signin'} />);
            }

            return redirectToHomePage(initURL)
        }

        // redirect user to main page if token is still valid
        if (location.pathname === '/signin') {
            if (typeof authUser === 'string' && authUser.length > 0) {
                return redirectToHomePage(initURL)
            }
        }

        // for RTL Support
        if (isDirectionRTL) {
            document.body.classList.add('rtl')
        } else {
            document.body.classList.remove('rtl');
        }

        const currentAppLocale = AppLocale[locale.locale];
        return (
            <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
                <div className="app-main">
                    <Switch>
                        <RestrictedRoute path={`${match.url}app`} authUser={authUser} component={MainApp} />
                        <Route path='/signin' component={SignIn} />
                        <Route component={asyncComponent(() => import('../components/Error404'))} />
                    </Switch>
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToProps = ({ settings, auth }) => {
    const { locale, isDirectionRTL } = settings;
    const { initURL, loader, authUser } = auth;
    return { locale, isDirectionRTL, initURL, loader, authUser }
};

export default connect(mapStateToProps, {
    setInitUrl,
    userRefreshToken,
    showAuthLoader,
})(App);
