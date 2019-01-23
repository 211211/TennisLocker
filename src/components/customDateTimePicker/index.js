import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
import './customDateTimePicker.scss'

const DATE_FORMAT = 'MMM Do, YYYY'
class CustomDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: new Date(),
            to: undefined
        }
    }
    showFromMonth = () => {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }

    }

    handleFromChange = (from) => {
        this.setState({ from });
        this.props.handleFromChange(moment(from));
    }

    handleToChange = (to) => {
        this.setState({ to }, this.showFromMonth);
        this.props.handleToChange(moment(to));
        this.props.addFilterDate(moment(this.state.from), moment(to))
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (
            <div className="InputFromTo">
                <DayPickerInput
                    value={from}
                    placeholder="From"
                    format={DATE_FORMAT}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 2,
                        onDayClick: () => this.to.getInput().focus(),
                    }}
                    onDayChange={this.handleFromChange}
                />
                <DayPickerInput
                    ref={el => (this.to = el)}
                    value={to}
                    placeholder="To"
                    format={DATE_FORMAT}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { before: from },
                        modifiers,
                        month: from,
                        fromMonth: from,
                        numberOfMonths: 2,
                    }}
                    onDayChange={this.handleToChange}
                />
            </div>
        );
    }
}

export default CustomDateTimePicker;