import React from 'react';
import BigCalendar from 'react-big-calendar';
import './calendar.scss';

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
const Calendar = ({ localizer, events, onNavigate, onSelectEvent }) => (
  <div className="app-calendar animated slideInUpTiny animation-duration-3">
    <BigCalendar
      events={events}
      step={60}
      popup
      views={allViews}
      defaultDate={new Date()}
      localizer={localizer}
      onNavigate={onNavigate}
      onSelectEvent={onSelectEvent}
      eventPropGetter={event => {
        const style = {
          backgroundColor: `#${event.colorEvent}`
        };
        return {
          style
        };
      }}
    />
  </div>
);
export default Calendar;
