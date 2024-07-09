import moment from "moment";

// Handle Format Date
const TimeFormatter = (date: Date) => {
  return moment(date).locale("en").format("DD MMMM YYYY HH:MM");
};

export default TimeFormatter;
