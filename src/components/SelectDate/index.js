// import React from 'react';

// const SearchBox = ({styleName, placeholder, onChange, value}) => {

//     return (
//         <div className={`search-bar right-side-icon bg-transparent ${styleName}`}>
//             <div className="form-group">
//                 <input className="form-control border-0" type="search" placeholder={placeholder} onChange={onChange}
//                        value={value}/>
//                 <button className="search-icon"><i className="zmdi zmdi-search zmdi-hc-lg"/></button>
//             </div>
//         </div>
//     )
// };
// export default SearchBox;

// SearchBox.defaultProps = {
//     styleName: "",
//     value: "",
//     placeholder: "Search here.."
// };

import React from "react";
import Select, { components } from "react-select";
import { connect } from "react-redux";
import "./selectDate.scss";
import SVG from "react-inlinesvg";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import calendarIcon from "../../assets/images/calendar.svg";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { addFacilitySelectDate } from "../../actions/redux/facilityFilter";

const mapStateToProps = ({ facilityFilter }) => ({
  facilityFilter
});

const mapDispatchToProps = dispatch => ({
  addFacilitySelectDate: (start, end) =>
    dispatch(addFacilitySelectDate(start, end))
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
  multiValueLabel: (styles, { data }) => ({
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
class SelectDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "Today", label: "Everything" },
      startDate: moment(),
      endDate: moment(),
      optionsSelect: [
        {
          value: "all days",
          label: "Everything",
          valueName: "every",
          valueDate: 0
        },
        { value: "1 days", label: "1 day", valueName: "days", valueDate: 1 },
        { value: "7 days", label: "7 days", valueName: "days", valueDate: 7 },
        {
          value: "2 Weeks",
          label: "2 weeks",
          valueName: "weeks",
          valueDate: 2
        },
        {
          value: "1 month",
          label: "1 month",
          valueName: "month",
          valueDate: 1
        },
        {
          value: "2 month",
          label: "2 month",
          valueName: "month",
          valueDate: 2
        },
        { value: "Custom", label: "Custom" }
      ]
    };
  }
  handleChangeSelect = selectedOption => {
    const today = moment().format("MM-DD-YYYY");
    if (selectedOption.value !== "Custom") {
      if (selectedOption.valueName === "days") {
        this.props.addFacilitySelectDate(
          today,
          moment()
            .add(selectedOption.valueDate, "days")
            .format("MM-DD-YYYY")
        );
      } else if (selectedOption.valueName === "weeks") {
        this.props.addFacilitySelectDate(
          moment()
            .subtract(14, "days")
            .format("MM-DD-YYYY"),
          today
        );
      } else if (selectedOption.valueName === "month") {
        this.props.addFacilitySelectDate(
          moment()
            .subtract(selectedOption.valueDate, "M")
            .format("MM-DD-YYYY"),
          today
        );
      } else if (selectedOption.valueName === "every") {
        this.props.addFacilitySelectDate(
          moment("1970-01-01").format("MM-DD-YYYY"),
          today
        );
      }
    }
    this.setState({ selectedOption });
  };
  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }
    this.setState({ startDate, endDate });
  };
  addFilterDate = () => {
    this.props.addFacilitySelectDate(
      this.state.startDate.format("MM-DD-YYYY"),
      this.state.endDate.format("MM-DD-YYYY")
    );
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  render() {
    const { facilityFilter: { facilityActive } } = this.props

    const DropdownIndicator = props => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <span className="svgselectDate">
              <SVG src={arrowIcon} />
            </span>
          </components.DropdownIndicator>
        )
      );
    };
    return (
      <div className="datePicker">
        <div className="datePicker-selectDate">
          <Select
            isDisabled={!facilityActive.id}
            value={this.state.selectedOption}
            components={{ DropdownIndicator }}
            onChange={this.handleChangeSelect}
            placeholder="Today"
            hideSelectedOptions={false}
            isSearchable={false}
            styles={colourStyles}
            options={this.state.optionsSelect}
            classNamePrefix="my-selectDate"
          />
        </div>
        {this.state.selectedOption.value === "Custom" && (
          <div className="datePicker_block-start">
            <div className="datePicker_block-start-custom">
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                dateFormat="MMM Do, YYYY"
                className="datePicker_block-start-custom-input"
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                maxDate={moment()}
                onChange={this.handleChangeStart}
              />
              <img
                className="datePicker_block-start-custom-img"
                src={calendarIcon}
                alt="calendarIcon"
              />
            </div>
            <div className="datePicker_block-start-custom">
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                maxDate={moment()}
                dateFormat="MMM Do, YYYY"
                className="datePicker_block-end-custom-input"
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
              />
              <img
                className="datePicker_block-start-custom-img"
                src={calendarIcon}
                alt="calendarIcon"
              />
            </div>
            <div
              onClick={this.addFilterDate}
              className="datePicker_block-button"
            >
              <span>Go</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDate);
