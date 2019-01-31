import React from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import {
  getMonthCalendar,
  getFilterEventType
} from '../../../../actions/Calendar';
import './app.scss';
import Calendar from '../Calendar';
import config from '../../../../config';
import ModalEventDetail from '../ModalEventDetail';
import SelectFilter from '../SelectFilter';

const localizer = BigCalendar.momentLocalizer(moment);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearEvents: new Date().getFullYear(),
      monthEvents: new Date().getMonth(),
      isOpen: false,
      idEvent: 0,
      typesEvent: {}
    };
    this.filterEvents = [];
    this.searchEventDetail = {};
  }

  componentDidMount() {
    if (this.props.paramsUser) {
      config.token = this.props.paramsUser.token;
      config.hecColor = this.props.paramsUser.color;
    }
    this.props.getMonthCalendar(this.state.yearEvents, this.state.monthEvents);
    this.props.getFilterEventType();
  }

  onSelectEvents = a => {
    this.setState({ isOpen: !this.state.isOpen, idEvent: a.id });
  };

  getOnNavigate = date => {
    const nextYear = date.getFullYear();
    const nextMonth = date.getMonth();
    if (this.state.yearEvents === nextYear) {
      if (this.state.monthEvents !== nextMonth) {
        this.props.getMonthCalendar(this.state.yearEvents, nextMonth);
        this.setState({ monthEvents: nextMonth });
      }
    } else {
      this.props.getMonthCalendar(nextYear, nextMonth);
      this.setState({ yearEvents: nextYear, monthEvents: nextMonth });
    }
  };

  filterMonthEvents = events => {
    const convertEvents = [];
    const hashMapEvents = {};
    const regExp = /\(([^)]+)\)/;
    events.forEach(item => {
      const convertEvent = {
        title: item.eventName,
        id: item.eventId,
        desc: item.description,
        start: new Date(Number(regExp.exec(item.startDate)[1])),
        end: new Date(Number(regExp.exec(item.endDate)[1])),
        colorEvent: item.eventColor,
        eventTypeId: item.eventTypeId
      };
      convertEvents.push(convertEvent);
      hashMapEvents[item.eventId] = item;
    });
    this.searchEventDetail = hashMapEvents;
    this.filterEvents = convertEvents;
  };
  isOpenModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  filterTypeSelect = typesEvent => {
    this.setState({ typesEvent });
  };
  filterTypes = () => {
    this.filterEvents = this.filterEvents.filter(
      item => this.state.typesEvent[item.eventTypeId] !== undefined
    );
  };
  render() {
    if (this.props.calendar.eventForMonth.length > 0) {
      this.filterMonthEvents(this.props.calendar.eventForMonth);
    }
    if (Object.keys(this.state.typesEvent).length > 0) {
      this.filterTypes();
    }
    const colorCalendar = this.props.paramsUser;
    return (
      <div
        className="app-wrapper"
        style={{
          '--main-color': `#${
            colorCalendar ? colorCalendar.color : config.hecColor
          }`
        }}
      >
        <div>
          <SelectFilter
            filterTypeSelect={this.filterTypeSelect}
            calendar={this.props.calendar}
          />
        </div>
        <Calendar
          events={this.filterEvents}
          onNavigate={this.getOnNavigate}
          localizer={localizer}
          onSelectEvent={this.onSelectEvents}
        />
        <ReactModal
          ariaHideApp={false}
          isOpen={this.state.isOpen}
          className="Modal"
          shouldCloseOnOverlayClick
          onRequestClose={this.isOpenModal}
        >
          <ModalEventDetail
            eventDetail={this.searchEventDetail[this.state.idEvent]}
            skinsColor={this.state.skins}
          />
        </ReactModal>
      </div>
    );
  }
}

App.propTypes = {
  getMonthCalendar: PropTypes.func.isRequired,
  calendar: PropTypes.shape({
    eventForMonth: PropTypes.array.isRequired
  }).isRequired
};

const mapStateToProps = ({ calendar }) => ({
  calendar
});

export default connect(
  mapStateToProps,
  {
    getMonthCalendar: (year, month) => getMonthCalendar(year, month),
    getFilterEventType: () => getFilterEventType()
  }
)(App);
