import TableRow from "../../ui/table/TableRow";
import CabinForm from "./CabinForm";
import propTypes from "prop-types";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import {
  HiClipboardDocumentCheck,
  HiOutlineTrash,
  HiSquare2Stack,
} from "react-icons/hi2";
import useDeleteCabin from "./useDeleteCabin";
import LastTd from "../../ui/table/LastTd";
import useCreateEditCabin from "./useCreateEditCabin";
import { useGeneralContext } from "../../contexts/GeneralContext";
import DeleteConfirmation from "./DeleteConfirmation";
import { HiDotsVertical, HiEye, HiTrash } from "react-icons/hi";
import ContextMenu from "../../ui/ContextMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CabinImage = styled.img`
  max-width: 100px;
  max-height: 67px;
  border-radius: 0.25rem;
  vertical-align: middle;
`;

Cabin.propTypes = {
  cabin: propTypes.object,
};

function Cabin({ cabin, setOpenContextId, openContextId }) {
  const [showContext, setShowContext] = useState(false);
  const navigate = useNavigate();
  const { handleShowModal } = useGeneralContext();
  const { isDeleting, mutate: deletingMutate } = useDeleteCabin(setShowContext);
  const { isPending: isDuplicating, mutate: duplicatingMutate } =
    useCreateEditCabin(setShowContext);

  function handelDuplicate() {
    const { id, created_at, ...cabinData } = cabin;
    duplicatingMutate({ cabinData });
  }

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
    <>
      <TableRow gridcols="1fr 1fr 2fr 1fr 1fr 0.1fr">
        <td>
          <CabinImage src={cabin.image} alt={cabin.name} />
        </td>
        <td>{cabin.name}</td>
        <td>fills up to {cabin.maxCapacity} guests</td>
        <td>{cabin.regularPrice}$</td>
        <td>{cabin.discount ? `${cabin.discount} $` : "-"}</td>
        <LastTd>
          <HiDotsVertical
            onClick={() => {
              setShowContext((showContext) => !showContext);
              setOpenContextId(cabin.id);
            }}
          />
          {showContext === true && openContextId === cabin.id && (
            <ContextMenu setShowContext={setShowContext}>
              <li onClick={() => navigate(`${cabin.id}`)}>
                <HiEye />
                See Details
              </li>

              <li onClick={handleUpdate}>
                <HiClipboardDocumentCheck />
                update
              </li>

              <li onClick={handelDuplicate}>
                {isDuplicating ? (
                  <Spinner type="secondary" />
                ) : (
                  <HiSquare2Stack />
                )}
                duplicate
              </li>
              <li onClick={handleDelete}>
                {isDeleting ? <Spinner type="secondary" /> : <HiTrash />}
                delete
              </li>
            </ContextMenu>
          )}
          {/* <Button className="quaternary" onClick={handleUpdate}>
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
          )} */}
        </LastTd>
      </TableRow>
    </>
  );
}

export default Cabin;
