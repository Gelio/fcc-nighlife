import leftPad from './left-pad';

class TimeService {
  static getFormattedDate(date = new Date()) {
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1, 2, '0');
    const day = leftPad(date.getDate(), 2, '0');
    return `${year}-${month}-${day}`;
  }
}

export default TimeService;
