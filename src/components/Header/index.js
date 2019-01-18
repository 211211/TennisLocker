import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';

import {COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION, INSIDE_THE_HEADER} from '../../constants/ActionTypes';
import MailNotification from '../MailNotification/index';
import AppNotification from '../AppNotification/index';
import CardHeader from '../../components/dashboard/Common/CardHeader/index';
import {switchLanguage, toggleCollapsedNav} from '../../actions/Setting';
import IntlMessages from '../../util/IntlMessages';
import LanguageSwitcher from '../../components/LanguageSwitcher/index';
import UserInfo from '../../components/UserInfo';
import Menu from "../../components/Header/Menu";
import logo from "../../assets/images/TennisLockerInternalPortal/logo.svg";
import SelectFilter from "../../components/SelectFilter";
import SelectDate from "../../components/SelectDate";

class Header extends React.Component {


    onAppNotificationSelect = () => {
        this.setState({
            appNotification: !this.state.appNotification
        })
    };
    onMailNotificationSelect = () => {
        this.setState({
            mailNotification: !this.state.mailNotification
        })
    };

    onUserInfoSelect = () => {
        this.setState({
            userInfo: !this.state.userInfo
        })
    };

    onLangSwitcherSelect = (event) => {
        this.setState({
            langSwitcher: !this.state.langSwitcher
        })
    };
    onSearchBoxSelect = () => {
        this.setState({
            searchBox: !this.state.searchBox
        })
    };
    handleRequestClose = () => {
        this.setState({langSwitcher: false, mailNotification: false, appNotification: false, searchBox: false});
    };
    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    constructor() {
        super();
        this.state = {
            searchBox: false,
            searchText: '',
            mailNotification: false,
            langSwitcher: false,
            appNotification: false,
            userInfo: false

        }
    }

    updateSearchText(evt) {
        this.setState({
            searchText: evt.target.value,
        });
    }

    renderSearchFacilityBox = () => {
        return (
            <div className={`search-bar right-side-icon bg-transparent`}>
                <SelectFilter />
                <SelectDate />
            </div>
        )
    }

    render() {
        const {drawerType, locale, navigationStyle, horizontalNavPosition} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-flex d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-flex' : 'd-none';

        return (
            <div className="app-main-header">
                <div className="d-flex app-toolbar align-items-center">
                    {navigationStyle === HORIZONTAL_NAVIGATION  ?
                        <div className="app-logo-bl">
                            <div className="d-block d-md-none">
                                <span className="jr-menu-icon"
                                      onClick={this.onToggleCollapsedNav}>
                                    <span className="menu-icon"/>
                                </span>
                            </div>
                            <div className="app-logo pointer d-none d-md-block">
                            <img className="d-none d-lg-block" alt='logo105x36' src={logo} />
                            <img className="d-block d-lg-none mr-3" alt='logo32x32' src={logo} />
                            </div>
                        </div>
                        :
                        <span className={`jr-menu-icon pointer ${drawerStyle}`}
                              onClick={this.onToggleCollapsedNav}>
                            <span className="menu-icon"/>
                        </span>
                    }
                    {this.renderSearchFacilityBox()}

                    {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER) &&
                    <Menu/>}

                    <ul className="header-notifications list-inline ml-auto">
                        <li className="list-inline-item app-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.appNotification}
                                toggle={this.onAppNotificationSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <span className="icon-btn size-20 font-size-16">
                                        {
                                            // <i className="zmdi zmdi-notifications-active zmdi-hc-lg icon-alert"/>
                                        }
                                        <i className="zmdi zmdi-notifications-active zmdi-hc-lg"/>
                                    </span>
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <CardHeader styleName="align-items-center"
                                                heading={<IntlMessages id="appNotification.title"/>}/>
                                    <AppNotification/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className="list-inline-item mail-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.mailNotification}
                                toggle={this.onMailNotificationSelect.bind(this)}
                            >
                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">

                                    <span className="icon-btn size-20 font-size-16">
                                        {
                                            // <i className="zmdi zmdi-comment-alt-text icon-alert zmdi-hc-lg"/>
                                        }
                                        <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg"/>
                                    </span>
                                </DropdownToggle>


                                <DropdownMenu right>
                                    <CardHeader styleName="align-items-center"
                                                heading={<IntlMessages id="mailNotification.title"/>}/>
                                    <MailNotification/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className="list-inline-item user-nav">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.userInfo}
                                toggle={this.onUserInfoSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <img
                                        alt='...'
                                        src='http://via.placeholder.com/150x150'
                                        className="pointer user-avatar size-30"/>
                                </DropdownToggle>

                                <DropdownMenu right>

                                    <UserInfo/>
                                </DropdownMenu>
                            </Dropdown>

                        </li>
                    </ul>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({settings}) => {
    const {drawerType, locale, navigationStyle, horizontalNavPosition} = settings;
    return {drawerType, locale, navigationStyle, horizontalNavPosition}
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, switchLanguage})(Header));