import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { getToday } from "../../utilities/helper";
import { isSameDay } from "date-fns";

const StyledActivity = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr 0.75fr 1fr;
  align-items: center;
  gap: 0.75rem;
  padding-right: 0.5rem;
  & p {
    color: var(--color-Gray-900);
  }
  & .nights {
    color: var(--color-Gray-600);
  }
`;
function Activity({ booking }) {
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
      <Button className="secondary" style={{ padding: "0.25rem 0.75rem" }}>
        {booking?.status === "unconfirmed" ? "check in" : "check out"}
      </Button>
    </StyledActivity>
  );
}

export default Activity;
