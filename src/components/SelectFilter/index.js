import React from "react";
import Select, { components } from "react-select";
import { connect } from "react-redux";
import "./selectFilter.scss";
import SVG from "react-inlinesvg";
import searchIcon from "../../assets/images/TennisLockerInternalPortal/seacrch.svg";
// import { addSelectFacility } from "../../actions/redux/facilityFilter";
import { getFacilities } from "../../actions/Facility";

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
    this.convertFacility = [];
    this.hashMapFacility = {};
  }

  componentDidMount() {
    this.props.getFacilities();
  }

  filterFacilityAll = facility => {
    if (Object.keys(this.state.facilityActive).length === 0) {
      const convertFacilitys = [];
      const hashMapFacilitys = {};
      facility.forEach(item => {
        const convertEvent = {
          value: item.facilityName,
          id: item.facilityId,
          label: item.facilityName
        };
        convertFacilitys.push(convertEvent);
        hashMapFacilitys[item.facilityId] = item;
      });
      this.convertFacility = convertFacilitys;
      this.hashMapFacility = hashMapFacilitys;
    }
  };

  handleChangeSelect = selectedOption => {
    // this.props.addSelectFacility(
    //   selectedOption.id,
    //   this.hashMapFacility[selectedOption.id]
    // );
    this.setState({
      selectedOption,
      facilityActive: this.hashMapFacility[selectedOption.id]
    });
  };

  render() {
    // if (this.props.facilities.facilityArr.length > 0) {
    //   this.filterFacilityAll(this.props.facilities.facilityArr);
    // }
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
          // onChange={this.handleChangeSelect}
          placeholder="Type Facility Name"
          hideSelectedOptions={false}
          styles={colourStyles}
          options={this.convertFacility}
          classNamePrefix="my-select"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ facilities }) => ({
  facilities
});

export default connect(mapStateToProps,
  {
    getFacilities,
  }
)(SelectFilter);
