import React from 'react';
import Select, { components } from 'react-select';
import { connect } from 'react-redux';
import './selectDate.scss';
import SVG from 'react-inlinesvg';
import arrowIcon from '../../assets/images/TennisLockerInternalPortal/icons/arrow.svg';
import calendarIcon from '../../assets/images/TennisLockerInternalPortal/calendar.svg';
import CustomDateTimePicker from '../customDateTimePicker'
import moment from 'moment';
import { addFacilitySelectDate } from '../../actions/Facility';

const mapStateToProps = ({ facilityFilter }) => ({
    facilityFilter
});

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isSelected, isFocused }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? '#d9dde0'
                    : isFocused
                        ? '#edf0f2'
                        : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? 'white'
                        ? 'black'
                        : 'black'
                    : 'black',
            ':before': {
                background: data.color
            }
        };
    },
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: '#edf0f2',
            paddingLeft: '5px',
            ':before': {
                background: data.color
            }
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'black'
    }),
    multiValueRemove: styles => ({
        ...styles,
        color: '#7a7a7a',
        ':hover': {
            color: '#040405',
            cursor: 'pointer'
        }
    })
};
class SelectDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: { value: 'Today', label: 'Everything' },
            startDate: moment(),
            endDate: moment(),
            optionsSelect: [
                {
                    value: 'all days',
                    label: 'Everything',
                    valueName: 'every',
                    valueDate: 0
                },
                { value: '1 days', label: '1 day', valueName: 'days', valueDate: 1 },
                { value: '7 days', label: '7 days', valueName: 'days', valueDate: 7 },
                {
                    value: '2 Weeks',
                    label: '2 weeks',
                    valueName: 'weeks',
                    valueDate: 2
                },
                {
                    value: '1 month',
                    label: '1 month',
                    valueName: 'month',
                    valueDate: 1
                },
                {
                    value: '2 months',
                    label: '2 months',
                    valueName: 'month',
                    valueDate: 2
                },
                { value: 'Custom', label: 'Custom' }
            ]
        };
    }
    buildFacilitySelectDateObject = (startDay, endDay) => {
        return {
            startDay,
            endDay,
        }
    }
    handleChangeSelect = selectedOption => {
        const today = moment().format('MM-DD-YYYY');
        if (selectedOption.value !== 'Custom') {
            let selectDateObj = {}
            if (selectedOption.valueName === 'days') {
                selectDateObj = this.buildFacilitySelectDateObject(today,
                    moment()
                        .add(selectedOption.valueDate, 'days')
                        .format('MM-DD-YYYY'))
            } else if (selectedOption.valueName === 'weeks') {
                selectDateObj = this.buildFacilitySelectDateObject(moment()
                    .subtract(14, 'days')
                    .format('MM-DD-YYYY'),
                    today)
            } else if (selectedOption.valueName === 'month') {
                selectDateObj = this.buildFacilitySelectDateObject(moment()
                    .subtract(selectedOption.valueDate, 'M')
                    .format('MM-DD-YYYY'),
                    today)
            } else if (selectedOption.valueName === 'every') {
                selectDateObj = this.buildFacilitySelectDateObject(moment('1970-01-01').format('MM-DD-YYYY'), today)
            }

            this.props.addFacilitySelectDate(selectDateObj)
        }
        this.setState({ 
            selectedOption
        });
    };
    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate;
        endDate = endDate || this.state.endDate;

        if (startDate.isAfter(endDate)) {
            endDate = startDate;
        }
        this.setState(
            { 
                startDate, 
                endDate 
            }
        );
    };
    addFilterDate = (startDate, endDate) => {
        let selectDateObj = this.buildFacilitySelectDateObject(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'))
        this.props.addFacilitySelectDate(selectDateObj);
    };

    handleChangeStart = startDate => this.handleChange({ startDate });

    handleChangeEnd = (endDate) => this.handleChange({ endDate });

    render() {
        const { facilityFilter: { facilityActive } } = this.props
        const {startDate, endDate} = this.state
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
                {this.state.selectedOption.value === 'Custom' && (
                    <div className="datePicker-selectCustomDate">
                        <CustomDateTimePicker
                            handleFromChange={this.handleChangeStart}
                            handleToChange={this.handleChangeEnd}
                            addFilterDate={this.addFilterDate}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    {
        addFacilitySelectDate: payload => addFacilitySelectDate(payload),
    }
)(SelectDate);
