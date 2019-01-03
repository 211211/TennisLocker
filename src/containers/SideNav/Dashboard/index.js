import React from "react";
import "./dashboard.scss";
import DashboardInfo from "./DashboardInfo/";
import DashboardButtons from "./DashboardButtons/";
import DashboardChart from "./DashboardChart/";
import { connect } from "react-redux";
import {
  getFacilityToday,
  getFacilitySelectDate
} from "../../../redux/action/facilityFilter";

const mapStateToProps = ({ facilityFilter }) => ({
  facilityFilter
});

const mapDispatchToProps = dispatch => ({
  getFacilityToday: id => dispatch(getFacilityToday(id)),
  getFacilitySelectDate: (id, startDay, endDay) =>
    dispatch(getFacilitySelectDate(id, startDay, endDay))
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
    const activeFacility = facility.activeDateSelect;
    const {
      facilityFilter: { flagFilter }
    } = this.props;

    if (facilityId !== null) {
      if (flag) {
        if (facility.activeDateSelect) {
          this.props.getFacilitySelectDate(
            facilityId,
            activeFacility.startDay,
            activeFacility.endDay
          );
        } else {
          this.props.getFacilityToday(facilityId);
        }
      }
    }

    return (
      <div className="dashboard">
        <div className="dashboard_blog">
          <div className="dashboard_blog-buttons">
            <DashboardButtons facilityBtn={facility.facilityDate} />
          </div>
          <DashboardInfo facilityActive={facility.facilityActive} />
        </div>
        <p className="features_title chart_title">Usage comparison</p>
        <div className={flagFilter ? "loader" : ""}>
          <svg
            className={flagFilter ? "circular-loader" : "circular"}
            viewBox="25 25 50 50"
          >
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
        <div className="dashboard_chart">
          <DashboardChart />
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
