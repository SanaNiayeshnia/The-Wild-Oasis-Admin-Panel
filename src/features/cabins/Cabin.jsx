import TableRow from "./TableRow";
import Button from "../../ui/Button";
import propTypes from "prop-types";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import CabinForm from "./CabinForm";
import { HiOutlineTrash } from "react-icons/hi2";
Cabin.propTypes = {
  cabin: propTypes.object,
};

const CabinImage = styled.img`
  max-width: 100px;
  border-radius: 0.25rem;
  vertical-align: middle;
`;
const LastTd = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  & button {
    text-align: center;
    margin: 0 !important;
  }
  & svg {
    width: 1.25em;
    height: 1.25em;
    cursor: pointer;
    color: var(--color-red-600);
    transition: all 0.3s;
  }
  & svg:hover {
    transform: scale(1.1);
  }
`;
const DeleteSpinner = styled(Spinner)`
  max-width: 20px !important;
`;

function Cabin({ cabin }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("The Cabin has been deleted.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <td>
          <CabinImage src={cabin.image} alt={cabin.name} />
        </td>
        <td>{cabin.name}</td>
        <td>{cabin.maxCapacity}</td>
        <td>{cabin.regularPrice}$</td>
        <td>{cabin.discount ? `${cabin.discount} $` : "no discount"}</td>
        <LastTd>
          <Button className="quaternary" onClick={() => setIsFormOpen(true)}>
            Update
          </Button>
          {isDeleting ? (
            <DeleteSpinner type="secondary" />
          ) : (
            <HiOutlineTrash onClick={() => mutate(cabin.id)} />
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
