import React from "react";
import Select, { components } from "react-select";
import { connect } from "react-redux";
import "./selectFilter.scss";
import SVG from "react-inlinesvg";
import searchIcon from "../../assets/images/TennisLockerInternalPortal/seacrch.svg";
import { addSelectFacility } from "../../actions/redux/facilityFilter";
import { getFacilityAll } from "../../actions/redux/facility";

const mapStateToProps = ({ facilityFilter, facility }) => ({
  facilityFilter,
  facility
});

const mapDispatchToProps = dispatch => ({
  addSelectFacility: (id, active) => dispatch(addSelectFacility(id, active)),
  getFacilityAll: () => dispatch(getFacilityAll())
});

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isSelected, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? "#d9dde0"
          : isFocused
            ? "#edf0f2"
            : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
          ? "white"
            ? "black"
            : "black"
          : "black",
      ":before": {
        background: data.color
      }
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#edf0f2",
      paddingLeft: "5px",
      ":before": {
        background: data.color
      }
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: "black"
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: "#7a7a7a",
    ":hover": {
      color: "#040405",
      cursor: "pointer"
    }
  })
};

class SelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      facilityActive: {}
    };
    this.convertFasility = [];
    this.hashMapFasility = {};
  }
  componentDidMount() {
    this.props.getFacilityAll();
  }
  filterFasilityAll = fasility => {
    if (Object.keys(this.state.facilityActive).length === 0) {
      const convertFasilitys = [];
      const hashMapFasilitys = {};
      fasility.forEach(item => {
        const convertEvent = {
          value: item.facilityName,
          id: item.facilityId,
          label: item.facilityName
        };
        convertFasilitys.push(convertEvent);
        hashMapFasilitys[item.facilityId] = item;
      });
      this.convertFasility = convertFasilitys;
      this.hashMapFasility = hashMapFasilitys;
    }
  };
  handleChangeSelect = selectedOption => {
    this.props.addSelectFacility(
      selectedOption.id,
      this.hashMapFasility[selectedOption.id]
    );
    this.setState({
      selectedOption,
      facilityActive: this.hashMapFasility[selectedOption.id]
    });
  };
  render() {
    if (this.props.facility.facilityArr.length > 0) {
      this.filterFasilityAll(this.props.facility.facilityArr);
    }
    const DropdownIndicator = props => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <span className="svgSelect">
              <SVG src={searchIcon} />
            </span>
          </components.DropdownIndicator>
        )
      );
    };
    return (
      <div className="app-wrapper-select">
        <Select
          value={this.state.selectedOption}
          components={{ DropdownIndicator }}
          onChange={this.handleChangeSelect}
          placeholder="Type Facility Name"
          hideSelectedOptions={false}
          styles={colourStyles}
          options={this.convertFasility}
          classNamePrefix="my-select"
        />
      </div>
    );
  }
}

// export default SelectFilter;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFilter);
