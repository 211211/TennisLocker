import React from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect'
import {
    getMonthCalendar,
    getFilterEventType
} from '../../../../actions/Calendar';
import './app.scss';
import Calendar from '../Calendar';
import config from '../../../../config';
import { makeSelectFacilityFilterActive } from '../../../../selectors/Facility/FacilityFilterSelector';
import { eventForMonthSelector, eventFilterTypesSelector } from '../../../../selectors/Calendar'
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

    componentWillReceiveProps(nextProps) {
        const { facilityFilterActive, getMonthCalendar, getFilterEventType } = this.props
        if (nextProps.facilityFilterActive.id !== facilityFilterActive.id) {
            getMonthCalendar(this.state.yearEvents, this.state.monthEvents);
            getFilterEventType();
        }
    }

    componentDidMount() {
        const { paramsUser, facilityFilterActive, getMonthCalendar, getFilterEventType } = this.props
        const { yearEvents, monthEvents } = this.state
        if (paramsUser) {
            config.token = paramsUser.token;
            config.hecColor = paramsUser.color;
        }

        if (facilityFilterActive.id) {
            getMonthCalendar(yearEvents, monthEvents);
            getFilterEventType();
        }
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
        const {eventForMonth} = this.props
        if (eventForMonth.length > 0) {
            this.filterMonthEvents(eventForMonth);
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
                        calendar={this.props.eventFilterTypes}
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
    eventForMonth: PropTypes.array.isRequired,
    eventFilterTypes: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    facilityFilterActive: makeSelectFacilityFilterActive(),
    eventForMonth: eventForMonthSelector(),
    eventFilterTypes: eventFilterTypesSelector(),
})

export default connect(
    mapStateToProps,
    {
        getMonthCalendar: (year, month) => getMonthCalendar(year, month),
        getFilterEventType: () => getFilterEventType()
    }
)(App);
