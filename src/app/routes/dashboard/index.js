import React from 'react';
import './dashboard.scss';
import DashboardInfo from './DashboardInfo';
import DashboardButtons from './DashboardButtons';
import DashboardChart from './DashboardChart';
import { connect } from 'react-redux';
import {
    userGetFacilitiesToday,
    userGetFacilitiesSelectDate
} from '../../../actions/Facility';

import withLoader from '../../../components/WithLoader';

const mapStateToProps = ({ facilityFilter, loading }) => {
    return {
        facilityFilter,
        loading,
    }
};

// If you get this warrning: Experimental support for decorators is a feature that is subject to change in a future release
// Solved here: https://github.com/Microsoft/vscode/issues/45071
@withLoader(({ loading }) => loading)
class Dashboard extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { 
            userGetFacilitiesToday,
            userGetFacilitiesSelectDate,
        } = this.props;
        const {
            facilityFilter
        } = nextProps;
        const facility = nextProps.facilityFilter; 
        const facilityId = facility.facilityActive.id; 
        const flag = facility.flagFilter; 
        const activeFacility = facility.activeDateSelect; 
       
        if (!flag || !facilityId) {
            return;
        } 
        if  (this.props.facilityFilter.facilityActive.id === facilityId && this.props.facilityFilter.activeDateSelect === activeFacility) {
            return;
        }
        if (facility.activeDateSelect) { 
            userGetFacilitiesSelectDate( 
                facilityId, 
                activeFacility.startDay, 
                activeFacility.endDay 
            ); 
        } else { 
            userGetFacilitiesToday(facilityId); 
        } 
    }

    render() {
        const facility = this.props.facilityFilter;
        const { facilityActive, facilityDate } = facility

        return (
            <div className="dashboard">
                <div className="dashboard_blog">
                    <div className="dashboard_blog-buttons">
                        <DashboardButtons facilityBtn={facility.facilityDate} />
                    </div>
                    <DashboardInfo facilityActive={facilityActive} />
                </div>
                <p className="features_title chart_title">Usage comparison</p>
                <div className="dashboard_chart">
                    <DashboardChart />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        userGetFacilitiesToday: id => userGetFacilitiesToday(id),
        userGetFacilitiesSelectDate: (id, startDay, endDay) => userGetFacilitiesSelectDate(id, startDay, endDay),
    }
)(Dashboard);
