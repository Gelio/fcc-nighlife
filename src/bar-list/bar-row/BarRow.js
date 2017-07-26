import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../bar';

import './BarRow.css';

/**

 * @param {{ bar: Bar }} props
 */
function BarRow(props) {
  const bar = props.bar;
  return (
    <li className="bar">
      <h3>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${bar.location
            .lat},${bar.location.lng}&query_place_id=${bar.id}`}
          target="_blank"
        >
          {bar.name}
        </a>
      </h3>
      <p>
        {bar.description}
      </p>
    </li>
  );
}

BarRow.propTypes = {
  bar: PropTypes.instanceOf(Bar).isRequired,
};

export default BarRow;
