import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import { formatDate, parseDate } from 'react-day-picker/moment';
import './customDateTimePicker.scss'

const DATE_FORMAT = 'MMM Do'

class CustomDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: new Date(),
            to: undefined,
            displayValue: ''
        }
    }
    showFromMonth = () => {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.datePicker.getDayPicker().showMonth(from);
        }

    }

    getDateWithFormat(date, format) {
        date = date || moment();
        return moment(date).format(format);
    }

    handleOnDayChange = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        const {from, to} = range;

        const displayValue = `${this.getDateWithFormat(from, DATE_FORMAT)} to ${this.getDateWithFormat(to, DATE_FORMAT)}`;
        this.setState({ from, to, displayValue  }, this.showFromMonth);
        
    }

    onDayPickerHide = () => {
        const {from, to} = this.state;
        if (!from || !to) {
            return;
        }
        this.props.addFilterDate(moment(from), moment(to));
    }

    componentDidMount(){
        this.datePicker.getInput().focus();
    }

    render() {
        const { from, to, displayValue } = this.state;
        const modifiers = { start: from, end: to };
        return (
            <div className="InputFromTo">
                 <DayPickerInput
                    value={displayValue}
                    placeholder="Select day range" 
                    ref={el => (this.datePicker = el)}  
                    dayPickerProps={{ 
                        selectedDays: [from, { from, to }], 
                        disabledDays: { after: to }, 
                        toMonth: to, 
                        modifiers, 
                        numberOfMonths: 2, 
                    }} 
                    hideOnDayClick={false}
                    onDayPickerHide={this.onDayPickerHide}
                    onDayChange={this.handleOnDayChange} 
                /> 
                
            </div>
        );
    }
}

export default CustomDateTimePicker;