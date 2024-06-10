function formatPrice(price) {
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
  const isStayingLastNight = endDateObj.getHours() > 14 ? true : false;
  return isStayingLastNight
    ? endDateObj.getDate() - startDateObj.getDate() + 1
    : endDateObj.getDate() - startDateObj.getDate();
}

function arrivingDay(startDate) {
  const startDateObj = new Date(startDate);
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.round((startDateObj - today) / oneDay);
  const arrivingDay =
    differenceInDays < -30
      ? `${Math.round(Math.abs(differenceInDays) / 30)} Months Ago`
      : differenceInDays < 0
      ? `${Math.abs(differenceInDays)} Days Ago`
      : differenceInDays < 30
      ? `In ${differenceInDays} Days`
      : differenceInDays > 30
      ? `In ${Math.round(differenceInDays / 30)} Months`
      : "Today";

  return arrivingDay;
}
export { formatPrice, formatDate, countNights, arrivingDay };
