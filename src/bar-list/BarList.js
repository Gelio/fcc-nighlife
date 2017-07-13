import React from 'react';

import Bar from './bar/Bar';

import './BarList.css';

function BarList() {
  return (
    <div className="bar-list-wrapper container">
      <h2>Bars near you</h2>

      <ul className="bar-list">
        <li>
          <Bar name="Bar a" description="Description" />
        </li>
        <li>
          <Bar name="Bar a" description="Description" />
        </li>
      </ul>
    </div>
  );
}

export default BarList;
