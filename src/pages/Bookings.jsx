import styled from "styled-components";
import BookingsTable from "../features/bookings/BookingsTable";
import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

const StyledBookings = styled.div`
  min-width: 950px;
  max-width: 950px;
  max-height: min-content;
  margin: auto;
`;
const BookingsHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 1.5rem;
  margin: auto;
  gap: 1.5rem;
  min-width: 950px;
  max-width: 950px;

  & p {
    color: var(--color-Gray-800);
    font-weight: 600;
  }
  &:first-child {
    font-size: 1.5rem;
  }
`;

function Bookings() {
  useEffect(() => {
    document.title = `${APP_NAME} - Bookings`;
  }, []);

  return (
    <StyledBookings>
      <BookingsHead>
        <p>Bookings</p>
        <BookingTableOperations />
      </BookingsHead>
      <BookingsTable />
    </StyledBookings>
  );
}

export default Bookings;
