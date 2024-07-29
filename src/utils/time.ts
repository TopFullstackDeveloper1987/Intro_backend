import moment from 'moment-timezone';

export const getIndiatime = (): Date => {
  const time = moment.tz(new Date(), 'Asia/Kolkata');
  time.utc(true).format();
  return new Date(time.toString());
};
