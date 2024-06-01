import styled from "styled-components";
import CabinTable from "../features/cabins/cabinTable/CabinTable";
import Button from "../ui/Button";
import CabinForm from "../features/cabins/CabinForm";
import { useGeneralContext } from "../contexts/GeneralContext";

const StyledCabins = styled.div`
  padding: 0 1rem;
  max-width: 55rem;
  max-height: min-content;
  margin: auto;
`;
const CabinHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
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

function Cabins() {
  const { handleShowModal } = useGeneralContext();

  return (
    <StyledCabins>
      <CabinHead>
        <p>All Cabins</p>
        <p>Filter / Sort</p>
      </CabinHead>
      <CabinTable />

      <Div>
        <Button
          className="secondary"
          onClick={() => {
            handleShowModal(<CabinForm key={Math.random()} cabinToEdit={{}} />);
          }}
        >
          Add New Cabin
        </Button>
      </Div>
    </StyledCabins>
  );
}

export default Cabins;
