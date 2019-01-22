import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CustomDateTimePicker from '../customDateTimePicker/CustomDateTimePicker'
import { addFacilitySelectDate } from '../../actions/Facility';

const mapStateToProps = ({ facilityFilter }) => ({
    facilityFilter
});

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
                    value: '2 month',
                    label: '2 month',
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
        const {startDate, endDate} = this.state
        let selectDateObj = this.buildFacilitySelectDateObject(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'))
        this.props.addFacilitySelectDate(selectDateObj);
    };

    handleChangeStart = startDate => this.handleChange({ startDate });

    handleChangeEnd = endDate => this.handleChange({ endDate });

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
                    <div className="datePicker_block-start">
                        <div className="datePicker_block-start-custom">
                            <DatePicker
                                selected={startDate}
                                selectsStart
                                dateFormat="MMM Do, YYYY"
                                className="datePicker_block-start-custom-input"
                                startDate={startDate}
                                endDate={endDate}
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
                                selected={endDate}
                                selectsEnd
                                maxDate={moment()}
                                dateFormat="MMM Do, YYYY"
                                className="datePicker_block-end-custom-input"
                                startDate={startDate}
                                endDate={endDate}
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
    {
        addFacilitySelectDate: payload => addFacilitySelectDate(payload),
    }
)(SelectDate);
