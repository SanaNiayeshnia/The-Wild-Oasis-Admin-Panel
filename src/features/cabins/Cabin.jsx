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
  &.loading {
    display: none;
  }
  &.loaded {
    display: block;
  }
`;
const Skeleton = styled.div`
  width: 100px;
  height: 67px;
  border-radius: 0.25rem;
  vertical-align: middle;
  animation: skeleton-loading 1s linear infinite alternate;

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 80%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }
`;

Cabin.propTypes = {
  cabin: propTypes.object,
};

function Cabin({ cabin, setOpenContextId, openContextId }) {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const navigate = useNavigate();
  const { handleShowModal } = useGeneralContext();
  const { isDeleting, mutate: deletingMutate } =
    useDeleteCabin(setOpenContextId);
  const { isPending: isDuplicating, mutate: duplicatingMutate } =
    useCreateEditCabin(setOpenContextId);

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
    handleShowModal(
      <CabinForm
        key={Math.random()}
        cabinToEdit={cabin}
        setOpenContextId={setOpenContextId}
      />
    );
  }

  return (
    <>
      <TableRow gridcols="1fr 1fr 2fr 1fr 1fr 0.1fr">
        <td>
          <CabinImage
            src={cabin.image}
            alt={cabin.name}
            className={isLoadedImg ? "loaded" : "loading"}
            onLoad={() => setIsLoadedImg(true)}
          />
          {!isLoadedImg && <Skeleton />}
        </td>
        <td>{cabin.name}</td>
        <td>fills up to {cabin.maxCapacity} guests</td>
        <td>{cabin.regularPrice}$</td>
        <td>{cabin.discount ? `${cabin.discount} $` : "-"}</td>
        <LastTd>
          <HiDotsVertical
            onClick={() => {
              openContextId !== cabin.id && setOpenContextId(cabin.id);
            }}
          />
          {openContextId === cabin.id && (
            <ContextMenu setOpenContextId={setOpenContextId}>
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
        </LastTd>
      </TableRow>
    </>
  );
}

export default Cabin;
