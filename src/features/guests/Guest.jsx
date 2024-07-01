import { HiDotsVertical } from "react-icons/hi";
import TableRow from "../../ui/table/TableRow";
import LastTd from "../../ui/table/LastTd";
import ContextMenu from "../../ui/ContextMenu";
import { HiClipboardDocumentCheck, HiTrash } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { useGeneralContext } from "../../contexts/GeneralContext";
import DeleteConfirmation from "../../ui/DeleteConfirmation";
import useDeleteGuest from "./useDeleteGuest";
import GuestForm from "./GuestForm";

function Guest({ guest, openContextId, setOpenContextId }) {
  const { handleShowModal } = useGeneralContext();
  const { isPending: isPendingDelete, mutate: deletingMutate } =
    useDeleteGuest();

  function handleDelete() {
    handleShowModal(
      <DeleteConfirmation
        whatToDelete="guest"
        object={guest}
        deletingMutate={deletingMutate}
      />
    );
  }

  function handleUpdate() {
    handleShowModal(<GuestForm key={Math.random()} guestToEdit={guest} />);
  }

  return (
    <TableRow gridcols="2fr 2fr 1fr 1fr 0.1fr">
      <td>{guest.fullName}</td>
      <td>{guest.email}</td>
      <td>{guest.nationality}</td>
      <td>{guest.nationalID}</td>
      <LastTd>
        <HiDotsVertical
          onClick={() => {
            setOpenContextId(guest.id);
          }}
        />
        {openContextId === guest.id && (
          <ContextMenu setOpenContextId={setOpenContextId}>
            <li onClick={handleUpdate}>
              <HiClipboardDocumentCheck />
              update
            </li>
            <li onClick={handleDelete}>
              {isPendingDelete ? <Spinner type="secondary" /> : <HiTrash />}
              delete
            </li>
          </ContextMenu>
        )}
      </LastTd>
    </TableRow>
  );
}

export default Guest;
