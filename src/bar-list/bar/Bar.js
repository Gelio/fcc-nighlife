import React from 'react';
import PropTypes from 'prop-types';

import './Bar.css';

function Bar({ name, description }) {
  return (
    <div className="bar">
      <h3>
        {name}
      </h3>
      <p>
        {description}
      </p>
    </div>
  );
}

Bar.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Bar;
