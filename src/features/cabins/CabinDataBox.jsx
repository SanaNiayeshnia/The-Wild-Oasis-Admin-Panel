import styled from "styled-components";
import { formatPrice } from "../../utilities/helper";
import Button from "../../ui/Button";
import { HiClipboardDocumentCheck, HiTrash } from "react-icons/hi2";
import { useGeneralContext } from "../../contexts/GeneralContext";
import DeleteConfirmation from "../../ui/DeleteConfirmation";
import CabinForm from "./CabinForm";
import useDeleteCabin from "./useDeleteCabin";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

const StyledCabinDataBox = styled.div`
  & p,
  & span {
    color: var(--color-Gray-900);
  }
`;
const Div = styled.div`
  display: flex;
  gap: 0.75rem;
  & img {
    width: 60%;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 5px 0 var(--shadow-color);
    border: 1px solid var(--color-Gray-200);
  }
  margin: 0;
`;

const CabinInfo = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-Gray-0);
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  & p span {
    font-weight: 600;
  }
  border: 1px solid var(--color-Gray-200);
`;

const Description = styled.p`
  padding: 1rem 1.5rem;
  text-align: justify;
  background-color: var(--color-Gray-0);
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  border-radius: 0.5rem;
  margin-top: 0.75rem;
  border: 1px solid var(--color-Gray-200);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

function CabinDataBox({ cabin }) {
  const { handleShowModal } = useGeneralContext();
  const { isDeleting, mutate: deletingMutate } = useDeleteCabin();

  function handleDelete() {
    handleShowModal(
      <DeleteConfirmation
        whatToDelete="cabin"
        object={cabin}
        deletingMutate={deletingMutate}
      />
    );
  }

  function handleUpdate() {
    handleShowModal(<CabinForm key={Math.random()} cabinToEdit={cabin} />);
  }

  return (
    <StyledCabinDataBox>
      <Div>
        <img src={cabin.image} alt={cabin.name} />
        <CabinInfo>
          <div>
            <p>
              <span>Name:</span> {cabin.name}
            </p>
            <p>
              <span>Id:</span> {cabin.id}
            </p>
            <p>
              <span>Max Capacity:</span> fills up to {cabin.maxCapacity}
            </p>
            <p>
              <span>Price:</span> {formatPrice(cabin.regularPrice)}
            </p>
            <p>
              <span>Discount:</span> {formatPrice(cabin.discount)}
            </p>
          </div>
        </CabinInfo>
      </Div>
      <Description>{cabin.description}</Description>
      <ButtonContainer>
        <Button className="quaternary" onClick={handleUpdate}>
          <HiClipboardDocumentCheck />
          Update
        </Button>
        <Button className="tertiary" onClick={handleDelete}>
          {isDeleting ? <Spinner type="secondary" /> : <HiTrash />}
          Delete
        </Button>
      </ButtonContainer>
    </StyledCabinDataBox>
  );
}

export default CabinDataBox;
