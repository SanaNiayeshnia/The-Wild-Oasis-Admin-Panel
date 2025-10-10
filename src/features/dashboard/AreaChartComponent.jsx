import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { formatDate } from "../../utilities/helper";
import { isSameDay, subDays } from "date-fns";

const StyledAreaChartComponent = styled.div`
  background-color: var(--color-Gray-0);
  padding: 1.5rem;
  grid-column: 1/-1;
  height: 320px;
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  & p {
    color: var(--color-Gray-900);
    margin: 0 0 1rem 0;
    font-weight: 600;
  }
`;

function AreaChartComponent({ bookings, numDays }) {
  const date = new Date();
  const array = Array.from({ length: numDays });
  const dates = array.map((_, index) => {
    return { date: subDays(date, index) };
  });

  const data = dates.map((dateObj) => {
    return {
      ...dateObj,
      formattedDate: `${formatDate(dateObj.date).month} ${
        formatDate(dateObj.date).date
      }`,
      totalPrice: bookings.reduce((total, booking) => {
        const bookingDate = new Date(booking.created_at);
        if (isSameDay(bookingDate, dateObj.date))
          return total + booking.totalPrice;
        else return total;
      }, 0),
      extrasPrice: bookings.reduce((total, booking) => {
        const bookingDate = new Date(booking.created_at);
        if (isSameDay(bookingDate, dateObj.date))
          return total + booking.extrasPrice;
        else return total;
      }, 0),
    };
  });

  data.sort((a, b) => a.date - b.date);

  const from = subDays(date, numDays);

  return (
    <StyledAreaChartComponent>
      <p>
        Sales from {formatDate(from).month} {formatDate(from).date} to{" "}
        {formatDate(date).month} {formatDate(date).date} {formatDate(date).year}
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 10,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="formattedDate"
            tick={{ fill: "var(--color-Gray-900)" }}
            tickLine={{ fill: "var(--color-Gray-900)" }}
          />
          <YAxis
            dataKey="totalPrice"
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tick={{ fill: "var(--color-Gray-900)" }}
            tickLine={{ fill: "var(--color-Gray-900)" }}
          />
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{ backgroundColor: "var(--color-Gray-0)" }}
          />
          <Area
            type="monotone"
            dataKey="totalPrice"
            stackId="1"
            stroke="var(--color-brand-500)"
            fill="var(--color-brand-200)"
            name="Total price"
          />
          <Area
            type="monotone"
            dataKey="extrasPrice"
            stackId="2"
            stroke="var(--color-green-500)"
            fill="var(--color-green-200)"
            name="Extras price"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledAreaChartComponent>
  );
}

export default AreaChartComponent;
