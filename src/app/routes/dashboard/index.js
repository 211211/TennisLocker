import React from "react";
import "./dashboard.scss";
import DashboardInfo from "./DashboardInfo";
import DashboardButtons from "./DashboardButtons";
import DashboardChart from "./DashboardChart";
import { connect } from "react-redux";
import {
    userGetFacilitiesToday,
    // getFacilitiesSelectDate
} from "../../../actions/Facility";

const mapStateToProps = ({ facilityFilter }) => ({
    facilityFilter
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const facility = this.props.facilityFilter;
        const facilityId = facility.facilityActive.id;
        const flag = facility.flagFilter;
        // const activeFacility = facility.activeDateSelect;
        const { facilityFilter: { flagFilter } } = this.props;

        if (facilityId) {
            if (flag) {
                if (facility.activeDateSelect) {
                    // this.props.getFacilitiesSelectDate(
                    //     facilityId,
                    //     activeFacility.startDay,
                    //     activeFacility.endDay
                    // );
                } else {
                    this.props.userGetFacilitiesToday(facilityId);
                }
            }
        }

        const {facilityActive, facilityDate} = facility
        return (
            <div className="dashboard">
                {
                    <React.Fragment>
                    <div className="dashboard_blog">
                        {
                            <div className="dashboard_blog-buttons">
                                <DashboardButtons facilityBtn={facility.facilityDate} />
                            </div>
                        }
                        <DashboardInfo facilityActive={facilityActive} />
                    </div>
                    <p className="features_title chart_title">Usage comparison</p>
                    {
                        // <div className="dashboard_chart">
                        //     <DashboardChart />
                        // </div>
                    }
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        userGetFacilitiesToday: id => userGetFacilitiesToday(id),
        // getFacilitiesSelectDate: (id, startDay, endDay) => getFacilitiesSelectDate(id, startDay, endDay)
    }
)(Dashboard);
