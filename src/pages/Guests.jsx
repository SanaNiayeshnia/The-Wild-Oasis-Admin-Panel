import styled from "styled-components";
import GuestsTable from "../features/guests/GuestsTable";
import GuestTableOperations from "../features/guests/GuestTableOperations";
import { APP_NAME } from "../utilities/constants";
import { useEffect } from "react";

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
  useEffect(() => {
    document.title = `${APP_NAME} - Guests`;
  }, []);

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
