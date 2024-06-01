import styled from "styled-components";
import Button from "../../ui/Button";
import { useGeneralContext } from "../../contexts/GeneralContext";

const StyledDeletCabinConfirmation = styled.div`
  padding: 1rem 1.5rem;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  & button {
    font-size: 0.85rem !important;
  }
`;
const Head = styled.h3`
  margin-bottom: 0;
  color: var(--color-Gray-900);
`;
function DeleteCabinConfirmation({ cabin, deletingMutate }) {
  const { handleCloseModal } = useGeneralContext();
  async function deleteCabin() {
    await deletingMutate(cabin.id);
    handleCloseModal();
  }
  return (
    <StyledDeletCabinConfirmation>
      <Head>Delete Cabins</Head>
      <p>Are you sure you want to delete cabin {cabin.name}?</p>
      <Div>
        <Button className="primary" type="cancel" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button className="secondary" onClick={deleteCabin}>
          Confirm
        </Button>
      </Div>
    </StyledDeletCabinConfirmation>
  );
}

export default DeleteCabinConfirmation;
