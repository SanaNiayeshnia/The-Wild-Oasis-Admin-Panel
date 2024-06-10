import TableRow from "../../ui/table/TableRow";
import Button from "../../ui/Button";
import CabinForm from "./CabinForm";
import propTypes from "prop-types";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { HiOutlineTrash, HiSquare2Stack } from "react-icons/hi2";
import useDeleteCabin from "./useDeleteCabin";
import LastTd from "../../ui/table/LastTd";
import useCreateEditCabin from "./useCreateEditCabin";
import { useGeneralContext } from "../../contexts/GeneralContext";
import DeleteCabinConfirmation from "./DeleteCabinConfirmation";

const CabinImage = styled.img`
  max-width: 100px;
  max-height: 67px;
  border-radius: 0.25rem;
  vertical-align: middle;
`;
const DeleteSpinner = styled(Spinner)`
  max-width: 20px !important;
`;

Cabin.propTypes = {
  cabin: propTypes.object,
};

function Cabin({ cabin }) {
  const { handleShowModal } = useGeneralContext();
  const { isDeleting, mutate: deletingMutate } = useDeleteCabin();
  const { isPending: isDuplicating, mutate: duplicatingMutate } =
    useCreateEditCabin();

  function handelDuplicate() {
    const { id, created_at, ...cabinData } = cabin;
    duplicatingMutate({ cabinData });
  }

  function handleDelete() {
    handleShowModal(
      <DeleteCabinConfirmation cabin={cabin} deletingMutate={deletingMutate} />
    );
  }

  function handleUpdate() {
    handleShowModal(<CabinForm key={Math.random()} cabinToEdit={cabin} />);
  }

  return (
    <>
      <TableRow gridcols="1fr 1fr 1fr 1fr 1fr 1fr">
        <td>
          <CabinImage src={cabin.image} alt={cabin.name} />
        </td>
        <td>{cabin.name}</td>
        <td>{cabin.maxCapacity}</td>
        <td>{cabin.regularPrice}$</td>
        <td>{cabin.discount ? `${cabin.discount} $` : "-"}</td>
        <LastTd>
          <Button className="quaternary" onClick={handleUpdate}>
            Update
          </Button>
          {isDeleting ? (
            <DeleteSpinner type="secondary" />
          ) : (
            <HiOutlineTrash
              className="deleteBtn"
              title="delete"
              onClick={handleDelete}
            />
          )}

          {isDuplicating ? (
            <DeleteSpinner type="secondary" />
          ) : (
            <HiSquare2Stack
              className="duplicateBtn"
              title="duplicate"
              onClick={handelDuplicate}
            />
          )}
        </LastTd>
      </TableRow>
    </>
  );
}

export default Cabin;
