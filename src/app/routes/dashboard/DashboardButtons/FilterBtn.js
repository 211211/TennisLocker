import React from "react";
import "./dashboardButtons.scss";
import checkImg from "../../../../assets/images/TennisLockerInternalPortal/chech.svg";
import NumberFormat from "react-number-format";
import {
  activeFacilityAddButtons,
  activeFacilityRemoveButtons
} from "../../../../actions/Facility";
import { connect } from "react-redux";

const mapStateToProps = ({ facilityActiveButton }) => ({
  facilityActiveButton
});

class FilterBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: this.props.item.activeFlag
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.facilityButtonsActive.length === 0) {
      state.isClick = false;
    }
    return state;
  }

  toggleButtons = () => {
    this.props.activeButtons(this.props.item, !this.state.isClick);
    this.setState({ isClick: !this.state.isClick });
    if (!this.state.isClick) {
      this.props.activeFacilityAddButtons({
        name: this.props.item.name,
        flag: !this.state.isClick
      });
    } else {
      this.props.activeFacilityRemoveButtons({
        name: this.props.item.name,
        flag: !this.state.isClick
      });
    }
  };

  render() {
    const { color, name, count } = this.props.item;
    return (
      <div
        style={{ background: color }}
        className="dashboard_buttons_block"
        key={name}
        onClick={this.toggleButtons}
      >
        <div className="dashboard_buttons_block-count">
          <NumberFormat
            value={count}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
        <div className="dashboard_buttons_block-name">{name}</div>
        <img
          style={{ display: this.state.isClick ? "block" : "none" }}
          className="dashboard_buttons_block-img"
          src={checkImg}
          alt="checkImg"
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    activeFacilityAddButtons: payload => activeFacilityAddButtons(payload),
    activeFacilityRemoveButtons: payload => activeFacilityRemoveButtons(payload),
  }
)(FilterBtn);
