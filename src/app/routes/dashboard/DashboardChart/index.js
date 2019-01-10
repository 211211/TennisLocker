import React from "react";
import "./dashboardChart.scss";
import { connect } from "react-redux";
import ColumnChart from "./ColumnChart";

const mapStateToProps = ({ facilityActive }) => ({
  facilityActive
});

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

    if (this.props.facilityActive.activeFacilityArray && this.props.facilityActive.activeFacilityArray.length > 0) {
      chartElem = this.props.facilityActive.activeFacilityArray.map(items => {
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

export default connect(
  mapStateToProps,
)(DashboardChart);
