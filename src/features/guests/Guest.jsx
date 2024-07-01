import { HiDotsVertical } from "react-icons/hi";
import TableRow from "../../ui/table/TableRow";
import LastTd from "../../ui/table/LastTd";
import ContextMenu from "../../ui/ContextMenu";
import { HiClipboardDocumentCheck, HiTrash } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";

function Guest({ guest, openContextId, setOpenContextId }) {
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
            <li>
              <HiClipboardDocumentCheck />
              update
            </li>
            <li>
              {/* {isPendingDelete ? <Spinner type="secondary" /> : <HiTrash />} */}
              delete
            </li>
          </ContextMenu>
        )}
      </LastTd>
    </TableRow>
  );
}

export default Guest;
