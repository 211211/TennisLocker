import React from 'react';
import moment from 'moment';
import './dashboardInfo.scss';
import imgPopup from '../../../../assets/images/TennisLockerInternalPortal/popupImg.png';
import back from '../../../../assets/images/TennisLockerInternalPortal/icons/back.svg';
import ReactModal from 'react-modal';

class DashboardInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // facilityActive: this.props.facilityActive
            isOpen: false
        };
    }
    isOpenModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    render() {
        const {
            facilityName,
            createdDate,
            facilitySubscriptionPlanName,
            facilityTypeDescription,
            isActive,
            ustaSectionName,
            city,
            state_Province,
            zipCode_MailCode,
            maxNumberOfPlayers
        } = this.props.facilityActive.active;
        const id = this.props.facilityActive.id;
        return (
            <div className="dashboard_blog dashboard_info_wrap">
                <div className="dashboard_blog_info">
                    <div className="dashboard_blog_info_head">
                        <div className="dashboard_blog_info_head_info">
                            <span className="dashboard_blog_info_head_info-title">
                                {facilityName}
                            </span>
                            <span>
                                {city}
                                {state_Province && ', ' + state_Province}
                                {zipCode_MailCode && ', ' + zipCode_MailCode}
                            </span>
                        </div>
                    </div>
                    <div className="dashboard_blog_date">
                        <div className="dashboard_blog_date-block">
                            <span className="dashboard_blog_date-block-title">
                                Start Date
              </span>
                            <span>{createdDate && moment(createdDate).format('MM-DD-YYYY').split('-').join('.')}</span>
                            <span />
                        </div>
                        <div className="dashboard_blog_date-block">
                            <span className="dashboard_blog_date-block-title">Status</span>
                            {facilityName && <span>{isActive ? 'Active' : 'Inactive'}</span>}
                        </div>
                    </div>
                    <div className="dashboard_blog_date">
                        <div className="dashboard_blog_date-block">
                            <span className="dashboard_blog_date-block-title">Plan Name</span>
                            <span className="dashboard_blog_date-block-plan">
                                {facilitySubscriptionPlanName}
                            </span>
                            <span />
                        </div>
                        <div className="dashboard_blog_date-block dashboard_blog_date-block-modife">
                            <span className="dashboard_blog_date-block-title">
                                Number of Players
              </span>
                            <span>{maxNumberOfPlayers}</span>
                        </div>
                    </div>

                    <div className="dashboard_blog_date">
                        <div className="dashboard_blog_date-block">
                            <span className="dashboard_blog_date-block-title">Section</span>
                            <span className="dashboard_blog_date-block-plan">
                                {ustaSectionName}
                            </span>
                        </div>
                        <div className="dashboard_blog_date-block dashboard_blog_date-block-modife">
                            <span className="dashboard_blog_date-block-title">
                                Facility ID
              </span>
                            <span>{id}</span>
                        </div>
                    </div>
                    <div className="dashboard_blog_date">
                        <div className="dashboard_blog_date-block">
                            <span className="dashboard_blog_date-block-title">Type</span>
                            <span>{facilityTypeDescription}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardInfo;
