import React from "react";
import "./dashboardButtons.scss";
import FilterBtn from "./FilterBtn";
import { connect } from "react-redux";
import { activeFacilityArray } from "../../../../actions/Facility";

const mapStateToProps = ({ facility, facilityActive, facilityFilter }) => ({
  facility,
  facilityActive,
  facilityFilter
});

class DashboardButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.facilityButtonsActive = [];
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {
      facilityActive: { activeFacilityArray },
      facilityFilter: { flagFilter }
    } = nextProps;

    const { facilityFilter } = this.props;

    if (facilityFilter.flagFilter && !flagFilter) {
      this.facilityButtonsActive = activeFacilityArray;
    }
  }

  activeButtons = (item, flag) => {
    let newArrayActive = [];
    if (flag) {
      this.facilityButtonsActive.push(item);
    } else {
      newArrayActive = this.facilityButtonsActive.filter(btn => {
        return btn.name !== item.name;
      });
      this.facilityButtonsActive = newArrayActive;
    }
    this.props.activeFacilityArray(this.facilityButtonsActive);
  };

  render() {
    this.facilityButtonsActive = [];
    if (this.facilityButtonsActive.length === 0) {
      this.props.activeFacilityArray(this.facilityButtonsActive);
    }

    const buttons = this.props.facilityBtn;
    let arrButtons = [];
    let topArrButtons = [];
    if (buttons.length > 0) {
      buttons.map(item => {
        if (item.isHidden !== true) {
          if (item.placement == "bottom") {
            arrButtons.push(
              <FilterBtn
                key={item.name}
                item={item}
                facilityButtonsActive={this.facilityButtonsActive}
                activeButtons={this.activeButtons}
              />
            );
          } else {
            topArrButtons.push(
              <FilterBtn
                key={item.name}
                item={item}
                facilityButtonsActive={this.facilityButtonsActive}
                activeButtons={this.activeButtons}
              />
            );
          }
        }
      });
    }
    return (
      <React.Fragment>
        <div className="dashboard_top_block">{topArrButtons}</div>
        <p className="features_title">Features</p>
        <div className="dashboard_bottom_block">{arrButtons}</div>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    activeFacilityArray: payload => activeFacilityArray(payload)
  }
)(DashboardButtons);
