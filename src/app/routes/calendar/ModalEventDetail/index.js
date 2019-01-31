import React from 'react';
import './ModalEventDetail.scss';
import {refactoringDate} from '../../../../helpers/ExternalCalendar/DateHelper';

const ModalEventDetail = props => {
  const {
    eventName,
    eventColor,
    coordinator,
    email,
    venue,
    phone,
    venueCity,
    venueState,
    venueStreet1,
    description,
    website,
    venueZip,
    startDate,
    endDate
  } = props.eventDetail;
  const bgColor = eventColor ? null : props.skinsColor;
  return (
    <div className="modalEventDetail">
      <span
        className={`modalEventDetail__title ${bgColor}`}
        style={{ backgroundColor: `#${eventColor}` }}
      >
        {eventName}
      </span>
      <div className="modalEventDetail__content">
        {description && (
          <span className="modalEventDetail__details">
            <span className="modalEventDetail__modify">Description</span>{' '}
            {description}
          </span>
        )}
        {startDate && (
          <span className="modalEventDetail__details">
            <span className="modalEventDetail__modify">Date</span>
            <div className="modalEventDetail__details-content">
              <span className="modalEventDetail__details-content-date">
                Start:{' '}
              </span>
              {refactoringDate(startDate)}
            </div>
            <div>
              <span className="modalEventDetail__details-content-date">
                End:{' '}
              </span>
              {refactoringDate(endDate)}
            </div>
          </span>
        )}
        {coordinator && (
          <span className="modalEventDetail__details">
            <span className="modalEventDetail__modify">Event Coordinator</span>{' '}
            {coordinator}
          </span>
        )}
        {phone && (
          <span className="modalEventDetail__details">
            <span className="modalEventDetail__modify">Phone</span>{' '}
            <span className="modalEventDetail__modify_phone">{phone}</span>
          </span>
        )}
        {email && (
          <span className="modalEventDetail__details">
            <span className="modalEventDetail__modify">Email</span>{' '}
            <span className="modalEventDetail__modify_phone">{email}</span>
          </span>
        )}
        <div className="modalEventDetail__Address">
          <span className="modalEventDetail__modify">
            Event Place and Address
          </span>
          <div>
            {venue && <span className="modalEventDetail__place">{venue}</span>}
            {venueStreet1 && (
              <span className="modalEventDetail__place">{venueStreet1}</span>
            )}
            <div className="modalEventDetail__block">
              {venueCity && (
                <span className="modalEventDetail__place">{venueCity},</span>
              )}
              {venueState && (
                <span className="modalEventDetail__place">{venueState}</span>
              )}
              {venueZip && (
                <span className="modalEventDetail__place"> {venueZip}</span>
              )}
            </div>
          </div>
        </div>
        {website && (
          <span className="modalEventDetail__details">
            <span className="modalEventDetail__modify">Web Site</span>
            <a href={website}>{website}</a>
          </span>
        )}
      </div>
    </div>
  );
};
export default ModalEventDetail;
