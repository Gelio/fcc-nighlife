import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BarRow from './BarRow';
import Bar from '../bar';

import AttendanceService from '../../attendance.service';
import AuthService from '../../authentication/auth.service';

class BarRowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendanceCount: 0,
    };
    this.updateAttendanceCount = this.updateAttendanceCount.bind(this);

    this.attendanceRef = AttendanceService.getAttendanceRef(props.bar, new Date());
    this.attendanceRef.child('count').on('value', this.updateAttendanceCount);
  }

  componentWillUnmount() {
    this.attendanceRef.child('count').off('value', this.updateAttendanceCount);
  }

  /**
   * @param {firebase.database.DataSnapshot} snapshot
   */
  updateAttendanceCount(snapshot) {
    this.setState({
      attendanceCount: snapshot.val() || 0,
    });
  }

  render() {
    const { bar, toggleAttendance, isAttending } = this.props;
    const attendanceCount = this.state.attendanceCount;
    const isAuthenticated = AuthService.isAuthenticated();
    return (
      <BarRow
        bar={bar}
        toggleAttendance={toggleAttendance}
        isAttending={isAttending}
        attendanceCount={attendanceCount}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

BarRowContainer.propTypes = {
  bar: PropTypes.instanceOf(Bar).isRequired,
  toggleAttendance: PropTypes.func.isRequired,
  isAttending: PropTypes.bool.isRequired,
};

export default BarRowContainer;
