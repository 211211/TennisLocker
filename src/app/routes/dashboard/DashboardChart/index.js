import React from "react";
import "./dashboardChart.scss";
import { connect } from "react-redux";
// import { activeFacilityArray } from "../../../../redux/action/facilityActive";
import data from '../data'
import ColumnChart from "./ColumnChart";

// const mapStateToProps = ({ facilityActive }) => ({
//   facilityActive
// });y

// const mapDispatchToProps = dispatch => null;
class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthColumn: null
    };
  }
  resize = () => this.forceUpdate();
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  changeWidth = widthColumn => {
    this.setState({ widthColumn });
  };
  render() {
    let chartElem = "";
    setTimeout(() => {
      const element = document.querySelector(
        ".chart_dashboard .chart_dashboard_elem:last-child"
      );
      if (element) {
        if (this.state.widthColumn !== element.clientWidth) {
          if (element.clientWidth < 130) {
            this.changeWidth(element.clientWidth);
          } else if (this.state.widthColumn) {
            this.changeWidth(null);
          }
        }
      }
    }, 0);
    if (data.facilityActive.activeFacilityArray.length > 0) {   // TODO: this.props.facilityActive
      chartElem = data.facilityActive.activeFacilityArray.map(items => { // TODO: this.props.facilityActive
        return (
          <ColumnChart
            widthColumn={this.state.widthColumn}
            key={items.name}
            item={items}
          />
        );
      });
    } else {
      return (
        <div className="chart_dashboard-select">
          <span>Please select one or more activity titles above</span>
        </div>
      );
    }
    return <div className="chart_dashboard">{chartElem}</div>;
  }
}
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DashboardChart);
export default DashboardChart
