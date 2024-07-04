import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { getToday } from "../../utilities/helper";
import { isSameDay } from "date-fns";
import useUpdateBooking from "../bookings/useUpdateBooking";
import Spinner from "../../ui/Spinner";

const StyledActivity = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.75fr 1.25fr;
  align-items: center;
  gap: 0.75rem;
  padding-right: 0.5rem;
  min-height: 80px;
  & p {
    color: var(--color-Gray-900);
  }
  & .nights {
    color: var(--color-Gray-600);
  }
`;
function Activity({ booking }) {
  const { isPending: isPendingStatus, mutate: changeStatusMutate } =
    useUpdateBooking(booking.id);

  function handleChangeStatus(status) {
    const { id: editId, created_at, guests, ...restBooking } = booking;
    const bookingObj = {
      ...restBooking,
      status,
      isPaid: status === "checked out" ? true : restBooking.isPaid,
    };

    changeStatusMutate({ editId, bookingObj });
  }

  return (
    <StyledActivity>
      <Tag
        statuses={[
          { name: "departing", color: "blue" },
          { name: "arriving", color: "green" },
        ]}
      >
        {isSameDay(getToday(), booking?.startDate) ? "arriving" : "departing"}
      </Tag>
      <p>{booking?.guests?.fullName}</p>
      <p className="nights">
        {booking?.numNights} night{booking?.numNights !== 1 && "s"}
      </p>
      <Button
        className={booking?.status === "unconfirmed" ? "secondary" : "quinery"}
        style={{ padding: "0.25rem 0.75rem" }}
        onClick={() =>
          booking?.status === "unconfirmed"
            ? handleChangeStatus("checked in")
            : handleChangeStatus("checked out")
        }
      >
        {isPendingStatus && <Spinner type="secondary" />}
        {booking?.status === "unconfirmed" ? "check in" : "check out"}
      </Button>
    </StyledActivity>
  );
}

export default Activity;
