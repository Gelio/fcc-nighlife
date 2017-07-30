/**
 * @param {any} subject
 * @param {number} targetLength
 * @param {string} [padString=' ']
 * @returns {string}
 */
function leftPad(subject, targetLength, padString = ' ') {
  const padStringLength = padString.length;
  const subjectString = String(subject);
  let lengthToPad = targetLength - subjectString.length;
  let temporaryPadding = '';
  let i = 0;

  while (lengthToPad > 0) {
    temporaryPadding += padString[i];
    i = (i + 1) % padStringLength;
    lengthToPad -= 1;
  }

  return temporaryPadding + subjectString;
}

export default leftPad;
