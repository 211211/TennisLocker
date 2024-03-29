import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import IntlMessages from 'util/IntlMessages';


class Menu extends Component {

    componentDidMount() {
        const { history } = this.props;

        const pathname = `#${history.location.pathname}`;// get current path
        const mainMenu = document.getElementsByClassName('nav-item');
        for (let i = 0; i < mainMenu.length; i++) {
            mainMenu[i].onclick = function () {
                for (let j = 0; j < mainMenu.length; j++) {
                    if (mainMenu[j].classList.contains('active')) {
                        mainMenu[j].classList.remove('active')
                    }
                }
                this.classList.toggle('active');
            }
        }
        const subMenuLi = document.getElementsByClassName('nav-arrow');
        for (let i = 0; i < subMenuLi.length; i++) {
            subMenuLi[i].onclick = function () {
                for (let j = 0; j < subMenuLi.length; j++) {
                    if (subMenuLi[j].classList.contains('active')) {
                        subMenuLi[j].classList.remove('active')
                    }
                }
                this.classList.toggle('active');
            }
        }
        const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
        try {
            const activeNav = this.closest(activeLi, 'ul'); // select closest ul
            if (activeNav.classList.contains('sub-menu')) {
                this.closest(activeNav, 'li').classList.add('active');
            } else {
                this.closest(activeLi, 'li').classList.add('active');
            }
            const parentNav = this.closest(activeNav, '.nav-item');
            if (parentNav) {
                parentNav.classList.add('active');
            }

        } catch (e) {

        }

    }

    closest(el, selector) {
        try {
            let matchesFn;
            // find vendor prefix
            ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                if (typeof document.body[fn] == 'function') {
                    matchesFn = fn;
                    return true;
                }
                return false;
            });

            let parent;

            // traverse parents
            while (el) {
                parent = el.parentElement;
                if (parent && parent[matchesFn](selector)) {
                    return parent;
                }
                el = parent;
            }
        } catch (e) {

        }

        return null;
    }


    render() {
        return (
            <div className="app-main-menu d-none d-md-block">
                <ul className="navbar-nav navbar-nav-mega">

                    <li className="nav-item">
                        <a href="javascript:void(0)"><IntlMessages id="sidebar.main" /></a>
                        <ul className="sub-menu">

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <NavLink to="/app/dashboard">
                                        <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                        <span className="nav-text">
                                            <IntlMessages id="sidebar.dashboard" />
                                        </span>
                                    </NavLink>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.users" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.players" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.coaches" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.parents" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.groups" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.events" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.fitnessTest" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.practiceMatches" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.goals" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.files" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.pushNotifications" />
                                    </span>
                                </a>
                            </li>

                            <li className="nav-arrow">
                                <a role="button" href="javascript:void(0)">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                                    <span className="nav-text">
                                        <IntlMessages id="sidebar.about" />
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        );
    }
}

export default withRouter(Menu);