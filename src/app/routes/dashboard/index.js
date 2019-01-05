import React from "react";
import "./index.js";
import DashboardInfo from "./DashboardInfo";
import DashboardButtons from "./DashboardButtons";
import DashboardChart from "./DashboardChart";
import data from './data'
// import { connect } from "react-redux";
// import {
//   getFacilityToday,
//   getFacilitySelectDate
// } fro../../../redux/action/facilityFilterlter";

// const mapStateToProps = ({ facilityFilter }) => ({
//   facilityFilter
// });

// const mapDispatchToProps = dispatch => ({
//   getFacilityToday: id => dispatch(getFacilityToday(id)),
//   getFacilitySelectDate: (id, startDay, endDay) =>
//     dispatch(getFacilitySelectDate(id, startDay, endDay))
// });

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const facility = this.props.facilityFilter;  // TODO
    const facility = data.facilityFilter;
    const facilityId = facility.facilityActive.id;
    const flag = facility.flagFilter;
    const activeFacility = facility.activeDateSelect;
    // const {
    //   facilityFilter: { flagFilter } // TODO
    // } = this.props;
    const {
      facilityFilter: { flagFilter }
    } = data;

    // if (facilityId !== null) { // TODO
    //   if (flag) {
    //     if (facility.activeDateSelect) {
    //       this.props.getFacilitySelectDate(
    //         facilityId,
    //         activeFacility.startDay,
    //         activeFacility.endDay
    //       );
    //     } else {
    //       this.props.getFacilityToday(facilityId);
    //     }
    //   }
    // }

    return (
      <div className="dashboard">
        <div className="dashboard_blog">
          <div className="dashboard_blog-buttons">
            <DashboardButtons facilityBtn={facility.facilityDate} />
          </div>
          <DashboardInfo facilityActive={facility.facilityActive} />
        </div>
        <p className="features_title chart_title">Usage comparison</p>
        <div className="dashboard_chart">
          <DashboardChart />
        </div>
      </div>
    );
  }
}
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Dashboard);

export default Dashboard