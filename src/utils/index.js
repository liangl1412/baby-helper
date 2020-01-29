import moment from 'moment';

export const formatDob = (dob) => {
  const dobObj = moment.unix(dob);
  const months = moment().diff(dobObj, 'months');
  const days = moment().diff(dobObj, 'days');
  let output = `${days} day(s) old`;
  if (months) {
    output = `${months} month(s) old`;
  }
  return output;
};
