import styled from "styled-components";
import CabinTable from "../features/cabins/cabinTable/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CabinForm from "../features/cabins/cabinForm/CabinForm";

const StyledCabin = styled.div`
  padding: 1rem;
  height: 100%;
  max-width: 55rem;
  margin: auto;
`;
const CabinHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 50rem;
  margin: auto;
  & p {
    color: var(--color-Gray-800);
    font-weight: 600;
    margin: 1rem 0;
  }
  & :first-child {
    font-size: 1.5rem;
  }
`;
const Div = styled.div`
  max-width: 55rem;
  margin: 0 auto;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0.5rem;
`;

function Cabins() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <StyledCabin>
      {!isFormOpen ? (
        <>
          <CabinHead>
            <p>All Cabins</p>
            <p>Filter / Sort</p>
          </CabinHead>
          <CabinTable />
          <Div>
            <Button className="secondary" onClick={() => setIsFormOpen(true)}>
              Add New Cabin
            </Button>
          </Div>
        </>
      ) : (
        <CabinForm setIsFormOpen={setIsFormOpen} />
      )}
    </StyledCabin>
  );
}

export default Cabins;
