import dayjs from 'dayjs';

export const transformDateToYMD = (time: string | Date = '') => {
  return dayjs(time).format('YYYY-MM-DD');
};
