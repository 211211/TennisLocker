import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class CustomDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            selectedDay: undefined,
            // isDisabled: false,
        };
    }

    handleDayChange(selectedDay, modifiers) {
        this.setState({
            selectedDay,
            // isDisabled: modifiers.disabled === true,
        });
    }

    render() {
        const {selectedDay} = this.state;
        return (
            <DayPickerInput
                value={selectedDay}
                onDayChange={this.handleDayChange}
                dayPickerProps={{
                    selectedDays: selectedDay,
                    disabledDays: {
                        daysOfWeek: [0, 6],
                    },
                }}
            />
        );
    }
}

export default CustomDateTimePicker;