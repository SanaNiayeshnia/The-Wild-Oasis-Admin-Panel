import TableRow from "./cabinTable/TableRow";
import Button from "../../ui/Button";
import propTypes from "prop-types";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import CabinForm from "./CabinForm";
import { HiOutlineTrash, HiSquare2Stack } from "react-icons/hi2";
import useDeleteCabin from "./useDeleteCabin";
import LastTd from "./cabinTable/LastTd";
import useCreateEditCabin from "./useCreateEditCabin";

const CabinImage = styled.img`
  max-width: 100px;
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isDeleting, mutate: deletingMutate } = useDeleteCabin();
  const { isPending: isDuplicating, mutate: duplicatingMutate } =
    useCreateEditCabin();

  function handelDuplicate() {
    const { id, ...cabinData } = cabin;
    duplicatingMutate({ cabinData });
  }

  return (
    <>
      <TableRow>
        <td>
          <CabinImage src={cabin.image} alt={cabin.name} />
        </td>
        <td>{cabin.name}</td>
        <td>{cabin.maxCapacity}</td>
        <td>{cabin.regularPrice}$</td>
        <td>{cabin.discount ? `${cabin.discount} $` : "-"}</td>
        <LastTd>
          <Button className="quaternary" onClick={() => setIsFormOpen(true)}>
            Update
          </Button>
          {isDeleting ? (
            <DeleteSpinner type="secondary" />
          ) : (
            <HiOutlineTrash
              className="deleteBtn"
              title="delete"
              onClick={() => deletingMutate(cabin.id)}
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
      {isFormOpen && (
        <tr>
          <td style={{ width: "100%" }}>
            <CabinForm cabinToEdit={cabin} setIsFormOpen={setIsFormOpen} />
          </td>
        </tr>
      )}
    </>
  );
}

export default Cabin;
