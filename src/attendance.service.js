import { database } from 'firebase';

import TimeService from './utils/time.service';
import AuthService from './authentication/auth.service';
// eslint-disable-next-line
import Bar from './bar-list/bar';

function AttendanceService() {
  /**
   * @private
   * @param {Bar} bar
   * @param {Date} date
   */
  function getAttendanceRef(bar, date) {
    const db = database();
    const formattedDate = TimeService.getFormattedDate(date);
    return db.ref(`/bars/${bar.id}/attendance/${formattedDate}`);
  }

  /**
   * @todo use cloud functions for updating the count
   * @private
   * @param {Bar} bar
   * @param {Date} date
   */
  function markAsAttending(bar, date) {
    const attendanceRef = getAttendanceRef(bar, date);

    // Updating the count should be done inside a transaction with a cloud function
    const userId = AuthService.getAuth().currentUser.uid;
    return Promise.all([
      attendanceRef.child('count').transaction(count => count + 1),
      attendanceRef.child(`people/${userId}`).set(true),
    ]);
  }

  /**
   * @todo use cloud functions for updating the count
   * @private
   * @param {Bar} bar
   * @param {Date} date
   */
  function markAsNotAttending(bar, date) {
    const attendanceRef = getAttendanceRef(bar, date);

    // Updating the count should be done inside a transaction with a cloud function
    const userId = AuthService.getAuth().currentUser.uid;
    return Promise.all([
      attendanceRef.child('count').transaction(count => count - 1),
      attendanceRef.child(`people/${userId}`).set(false),
    ]);
  }

  /**
   * @param {any} userId
   * @param {Bar} bar
   * @param {Date} date
   */
  function isUserAttending(userId, bar, date) {
    const attendanceRef = getAttendanceRef(bar, date);
    return attendanceRef.child(`people/${userId}`).once('value').then(snapshot => snapshot.val());
  }

  /**
   * @param {Bar} bar
   * @param {Date} date
   */
  function getAttendanceCount(bar, date) {
    const attendanceRef = getAttendanceRef(bar, date);
    return attendanceRef.child('count').once('value').then(snapshot => snapshot.val() || 0);
  }

  /**
   * @param {Bar} bar
   * @param {Date} date
   */
  async function toggleAttendance(bar, date) {
    const userId = AuthService.getAuth().currentUser.uid;
    const isAttending = await isUserAttending(userId, bar, date);

    return isAttending ? markAsNotAttending(bar, date) : markAsAttending(bar, date);
  }

  return {
    getAttendanceRef,
    isUserAttending,
    getAttendanceCount,
    toggleAttendance,
  };
}

export default AttendanceService();
