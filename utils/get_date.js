const currentDate = new Date();

const getCurrentDate = () => {
  const localTime = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  ).toISOString();
  return localTime;
};

const getSetDate = (setDate, date) => {
  const currentDates = new Date();
  setDate(currentDates);
  const localTime = new Date(
    currentDates.getTime() - currentDates.getTimezoneOffset() * 60000
  ).toISOString();
  return localTime;
};

const convertToCurrentTimeZone = (date) => {
  const dateData = new Date(date);
  return new Date(
    dateData.getTime() - dateData.getTimezoneOffset() * 60000
  ).toISOString();
};

const getUnixDate = () => {
  const unixDate = Date.now();
  return unixDate;
};

const getDate = () => {
  const date = currentDate.getDate();
  return date;
};

const getMonth = () => {
  const month = currentDate.getMonth();
  return month;
};

const getYear = () => {
  const year = currentDate.getFullYear().toString().slice(2, 4);
  return year;
};

export { getCurrentDate, getSetDate, getUnixDate, getDate, getMonth, getYear };
