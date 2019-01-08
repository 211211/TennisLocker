import React from 'react';
import {MINI_DRAWER} from "constants/ActionTypes";

import logo from '../../assets/images/TennisLockerInternalPortal/logo.svg'

const SidenavLogo = ({drawerType}) => {

    const showMini = drawerType.includes(MINI_DRAWER);

    return (
        <div className="sidebar-header d-flex align-items-center">
            {showMini ?
                <div className="mini-logo">
                    <img className="mini-logo-img" alt='logo32x32' src={logo}/>
                    <img className="mini-logo-img-hover" alt='logo105x36' src={logo}/>
                </div> : <img alt='logo105x36' src={logo}/>
            }
        </div>
    );
};

export default SidenavLogo;
