import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {

    componentDidMount() {
        const { history } = this.props;
        const that = this;
        const pathname = `#${history.location.pathname}`;// get current path

        const subMenuLi = document.querySelectorAll('.sub-menu > li');
        for (let i = 0; i < subMenuLi.length; i++) {
            subMenuLi[i].onclick = function (event) {
                event.stopPropagation();
            }
        }

        const menuLi = document.getElementsByClassName('menu');
        for (let i = 0; i < menuLi.length; i++) {
            menuLi[i].onclick = function (event) {
                for (let j = 0; j < menuLi.length; j++) {
                    const parentLi = that.closest(this, 'li');
                    if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
                        menuLi[j].classList.remove('open')
                    }
                }
                this.classList.toggle('open');
                event.stopPropagation();
            }
        }

        const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
        try {
            const activeNav = this.closest(activeLi, 'ul'); // select closest ul
            if (activeNav.classList.contains('sub-menu')) {
                this.closest(activeNav, 'li').classList.add('open');
            } else {
                this.closest(activeLi, 'li').classList.add('open');
            }
        } catch (error) {

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
            <CustomScrollbars className="scrollbar" style={{ height: 'calc(100vh - 70px)' }}>
                <ul className="nav-menu">
                    <li className="nav-header"><IntlMessages id="sidebar.main" /></li>
                    <li className="menu no-arrow">
                        <NavLink className="prepend-icon" to="/app/dashboard">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.dashboard" />
                            </span>
                        </NavLink>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-accounts-outline zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.users" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-account zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.players" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-accounts zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.coaches" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-male-female zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.parents" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-group zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.groups" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <NavLink className="prepend-icon" to="/app/events">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.events" />
                            </span>
                        </NavLink>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.fitnessTest" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.practiceMatches" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.goals" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.files" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.pushNotifications" />
                            </span>
                        </a>
                    </li>

                    <li className="menu no-arrow">
                        <a role="button" href="javascript:void(0)">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                            <span className="nav-text">
                                <IntlMessages id="sidebar.about" />
                            </span>
                        </a>
                    </li>
                </ul>
            </CustomScrollbars>
        );
    }
}

export default withRouter(SidenavContent);
