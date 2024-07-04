import styled from "styled-components";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";

const StyledCabins = styled.div`
  padding: 0 1rem;
  max-width: 70rem;
  max-height: min-content;
  margin: auto;
`;
const CabinHead = styled.div`
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

function Cabins() {
  useEffect(() => {
    document.title = `${APP_NAME} - Cabins`;
  }, []);

  return (
    <StyledCabins>
      <CabinHead>
        <p>Cabins</p>
        <CabinTableOperations />
      </CabinHead>
      <CabinTable />
    </StyledCabins>
  );
}

export default Cabins;
