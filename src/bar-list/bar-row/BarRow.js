import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../bar';

import './BarRow.css';

/**
 * @param {{ bar: Bar, toggleAttendance: Function, isAttending: boolean, attendanceCount: number, isAuthenticated: boolean }} props
 */
function BarRow(props) {
  const { bar, toggleAttendance, isAttending, attendanceCount, isAuthenticated } = props;

  return (
    <li className="bar">
      <div className="bar-attend-button-wrapper">
        <button className="bar-attend-button" onClick={() => toggleAttendance(bar)} disabled={!isAuthenticated}>
          {isAttending ? 'Unattend' : 'Attend'}
        </button>

        {isAuthenticated || <span>You must be authenticated to attend.</span>}
      </div>
      <div className="bar-info">
        <h3>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${bar.location.lat},${bar
              .location.lng}&query_place_id=${bar.id}`}
            target="_blank"
            className="bar-link"
          >
            {bar.name} ({bar.rating})
          </a>
        </h3>
        <div className="bar-description">
          <p>
            {bar.description}
          </p>
          <span>
            {attendanceCount} {attendanceCount === 1 ? 'person is' : 'people are'} attending.
          </span>
        </div>
      </div>
    </li>
  );
}

BarRow.propTypes = {
  bar: PropTypes.instanceOf(Bar).isRequired,
  toggleAttendance: PropTypes.func.isRequired,
  isAttending: PropTypes.bool.isRequired,
  attendanceCount: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default BarRow;
