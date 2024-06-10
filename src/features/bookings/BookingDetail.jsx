import styled from "styled-components";
import Tag from "../../ui/Tag";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";

const StyledBookingDetail = styled.div`
  padding: 0 1rem;
  max-width: 55rem;
  max-height: min-content;
  margin: auto;
`;
const BookingHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  margin: auto;

  & span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-Gray-800);
    font-weight: 600;
    cursor: pointer;
  }
  & span svg {
    transition: all 0.3s;
  }
  & span:hover svg {
    color: var(--color-green-500);
    transform: scale(1.1);
  }
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:first-child {
    font-size: 1.5rem;
    color: var(--color-Gray-800);
    font-weight: 600;
  }
`;
function BookingDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: booking, isLoading } = useQuery({
    queryKey: [`booking/${id}`],
    queryFn: () => getBooking(id),
  });
  return (
    <StyledBookingDetail>
      <BookingHead>
        <Div>
          <p>Booking#{id}</p>
          {!isLoading && (
            <Tag
              statuses={[
                { name: "unconfirmed", color: "blue" },
                { name: "checked in", color: "green" },
                { name: "checked out", color: "Gray" },
              ]}
            >
              {booking?.status}
            </Tag>
          )}
        </Div>
        <span onClick={() => navigate(-1)}>
          <HiArrowLeft />
          Back
        </span>
      </BookingHead>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <BookingDataBox booking={booking} />
      )}
    </StyledBookingDetail>
  );
}

export default BookingDetail;
