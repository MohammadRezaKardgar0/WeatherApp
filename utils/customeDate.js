const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Thursday",
  "Wednesday",
  "Friday",
  "Saturday",
];

const getWeekDay = (data) => {
  return DAYS[new Date(data * 1000).getDay()];
};

export { getWeekDay };
