import React from 'react';
import Select from 'react-select';
import chroma from 'chroma-js';
import './selectFilter.scss';
const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isSelected, isFocused }) => {
    const color = chroma('#ccc');
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
          ? chroma.contrast(color, 'white') > 2
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

class SelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      optionsSelect: [],
      eventsType: []
    };
  }

  handleChangeSelect = selectedOption => {
    const hashMapFilter = {};
    selectedOption.forEach(item => {
      hashMapFilter[item.value] = item;
    });
    this.props.filterTypeSelect(hashMapFilter);
    this.setState({ selectedOption });
  };

    selectOptions = () => {
        const { eventsType } = this.state
        const { eventFilterTypes } = this.props
        if (eventsType !== eventFilterTypes) {
            this.setState({ eventsType: eventFilterTypes });
            const options = [];
            eventFilterTypes.map(item => {
                return options.push({
                    value: item.eventTypeId,
                    label: item.eventTypeName,
                    color: `#${item.eventColor}`
                });
            });
            this.setState({ optionsSelect: options });
        }
    };

  render() {
    return (
      <div className="app-wrapper-select" onClick={this.selectOptions} style={{marginBottom: 30}}>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChangeSelect}
          closeMenuOnSelect={false}
          isMulti
          placeholder="Filter Event Type"
          hideSelectedOptions={false}
          styles={colourStyles}
          options={this.state.optionsSelect}
          classNamePrefix="my-select"
        />
      </div>
    );
  }
}

export default SelectFilter;
