function formatPrice(price = 0) {
  return "$" + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const dateObj = new Date(date);
  const weekDay = weekDays[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const time = timeFormatter.format(dateObj);

  const formattedDate = {
    weekDay,
    date: dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate(),
    month,
    year: dateObj.getFullYear(),
    time,
  };
  return formattedDate;
}

function countNights(startDate, endDate) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  if (endDateObj <= startDateObj) {
    return 0;
  }
  const diffTime = endDateObj - startDateObj;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const isStayingLastNight = endDateObj.getHours() > 14;
  return Math.floor(diffDays) + (isStayingLastNight ? 1 : 0);
}

function arrivingDay(startDate) {
  const startDateObj = new Date(startDate);
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.ceil((startDateObj - today) / oneDay);
  const arrivingDay =
    differenceInDays < -30
      ? `${Math.round(Math.abs(differenceInDays) / 30)} Months Ago`
      : differenceInDays < 0
      ? `${Math.abs(differenceInDays)} Day${
          differenceInDays !== -1 ? "s" : ""
        } Ago`
      : differenceInDays === -1
      ? "Yesterday"
      : differenceInDays === 0
      ? "Today"
      : differenceInDays === 1
      ? "Tomorrow"
      : differenceInDays < 30
      ? `In ${differenceInDays} Day${differenceInDays !== 1 ? "s" : ""}`
      : differenceInDays > 30
      ? `In ${Math.round(differenceInDays / 30)} Months`
      : "Today";

  return arrivingDay;
}

const formatDateForHTMLInput = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function getToday(options) {
  const today = new Date();
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.getUTCHours(0, 0, 0, 0, 0);
  return today.toISOString();
}

export {
  formatPrice,
  formatDate,
  countNights,
  arrivingDay,
  formatDateForHTMLInput,
  getToday,
};
