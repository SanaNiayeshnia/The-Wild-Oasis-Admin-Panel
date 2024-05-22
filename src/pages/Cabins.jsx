import styled from "styled-components";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import NewCabinForm from "../features/cabins/NewCabinForm";

const StyledCabin = styled.div`
  padding: 1rem;
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
const AddCabinBtn = styled(Button)`
  background-color: var(--color-green-500);
  color: white;
  padding: 0.5rem 0.75rem;
  &:hover {
    background-color: var(--color-green-600);
    color: white;
  }
`;
const Container = styled.div`
  margin: auto;

  max-width: 55rem;
`;
function Cabins() {
  const [isAddNewCabinFormOpen, setIsAddNewCabinFormOpen] = useState(false);
  return (
    <StyledCabin>
      <Container>
        <CabinHead>
          <p>All Cabins</p>
          <p>Filter / Sort</p>
        </CabinHead>
        <CabinTable />
        {!isAddNewCabinFormOpen ? (
          <Div>
            <AddCabinBtn onClick={() => setIsAddNewCabinFormOpen(true)}>
              Add New Cabin
            </AddCabinBtn>
          </Div>
        ) : (
          <NewCabinForm setIsAddNewCabinFormOpen={setIsAddNewCabinFormOpen} />
        )}
      </Container>
    </StyledCabin>
  );
}

export default Cabins;
