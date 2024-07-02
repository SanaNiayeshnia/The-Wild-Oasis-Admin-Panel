import styled from "styled-components";
import GuestsTable from "../features/guests/GuestsTable";
import GuestTableOperations from "../features/guests/GuestTableOperations";

const StyledGuests = styled.div`
  padding: 0 1rem;
  max-width: 65rem;
  max-height: min-content;
  margin: auto;
`;
const GuestsHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 1.5rem;
  margin: auto;
  & p {
    color: var(--color-Gray-800);
    font-weight: 600;
  }
  &:first-child {
    font-size: 1.5rem;
  }
`;
function Guests() {
  return (
    <StyledGuests>
      <GuestsHead>
        <p>Guests</p>
        <GuestTableOperations />
      </GuestsHead>
      <GuestsTable />
    </StyledGuests>
  );
}

export default Guests;
