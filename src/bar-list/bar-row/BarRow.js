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
    <div className="bar">
      <h3>
        {bar.name}
      </h3>
      <p>
        {bar.description}
      </p>
    </div>
  );
}

BarRow.propTypes = {
  bar: PropTypes.instanceOf(Bar).isRequired,
};

export default BarRow;
