import styled, { css } from "styled-components";
import {
  HiOutlineHomeModern,
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
  HiOutlineUser,
} from "react-icons/hi2";
import { arrivingDay, formatDate, formatPrice } from "../../utilities/helper";
import propTypes from "prop-types";

const StyledBookingBoxDate = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  & span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  & span svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  box-shadow: 0px 0px 5px 0 #cbd5e1;
`;
const BoxHeader = styled.div`
  background-color: var(--color-green-500);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & span {
    color: white;
  }
  & span:first-child {
    font-weight: 600;
  }
  & span svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
const BoxBody = styled.div`
  background-color: white;
  padding: 0.75rem 1.5rem;
`;
const Section = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  & p {
    color: var(--color-Gray-500);
  }
  & svg {
    color: var(--color-green-500);
  }
  & span {
    font-weight: 500;
  }
`;
const Total = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  ${(props) =>
    props.isPaid
      ? css`
          background-color: var(--color-green-100);
        `
      : css`
          background-color: var(--color-yellow-100);
        `}

  padding: 0.25rem 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  & span,
  & p {
    ${(props) =>
      props.isPaid
        ? css`
            color: var(--color-green-700);
          `
        : css`
            color: var(--color-yellow-700);
          `}
  }
  & p {
    font-weight: 500;
    font-size: 0.9rem;
  }
  & span span {
    font-weight: 500;
  }
`;
const BookingDate = styled.p`
  text-align: right;
  font-size: 0.9rem;
  color: var(--color-Gray-500);
  font-weight: 500;
`;

BookingDataBox.propTypes = {
  booking: propTypes.object,
};
function BookingDataBox({ booking }) {
  const guest = booking.guests;
  const cabin = booking.cabins;
  const {
    month: startMonth,
    year: startYear,
    date: startDate,
    weekDay: startWeekday,
  } = formatDate(booking.startDate);
  const {
    month: endMonth,
    year: endYear,
    date: endDate,
    weekDay: endWeekday,
  } = formatDate(booking.endDate);
  const {
    month: createdMonth,
    year: createdYear,
    date: createdDate,
    weekDay: createdWeekday,
    time: createdTime,
  } = formatDate(booking.created_at);

  return (
    <StyledBookingBoxDate>
      <BoxHeader>
        <span>
          <HiOutlineHomeModern />
          {booking.numNights} nights in Cabin {cabin.name}
        </span>
        <span>
          {startWeekday}, {startMonth} {startDate} {startYear} (
          {arrivingDay(booking.startDate)}) - {endWeekday}, {endMonth} {endDate}{" "}
          {endYear}
        </span>
      </BoxHeader>
      <BoxBody>
        <Section>
          <span>
            <HiOutlineUser />
            {guest.fullName} + {booking.numGuests - 1} guest
            {booking.numGuests - 1 !== 1 && "s"}
          </span>
          <p> • {guest.email} • </p>
          <p>National ID {guest.nationalID}</p>
        </Section>
        <Section>
          <span>
            <HiOutlineCheckCircle />
            Breakfast included?
          </span>
          <p>{booking.hasBreakfast ? "Yes" : "No"}</p>
        </Section>
        <Total isPaid={booking.isPaid}>
          <span>
            <HiOutlineCurrencyDollar />
            <span>Total price</span>{" "}
            {`${formatPrice(booking?.totalPrice)} (${formatPrice(
              booking.cabinPrice
            )} cabin + ${formatPrice(booking.extrasPrice)} breakfast)`}
          </span>
          <p>{booking.isPaid ? "PAID" : "WILL PAY AT PROPERTY"}</p>
        </Total>
        <BookingDate>
          Booked {createdWeekday}, {createdMonth} {createdDate} {createdYear},{" "}
          {createdTime}
        </BookingDate>
      </BoxBody>
    </StyledBookingBoxDate>
  );
}

export default BookingDataBox;
