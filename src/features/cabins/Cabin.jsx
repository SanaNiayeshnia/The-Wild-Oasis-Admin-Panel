import TableRow from "./TableRow";
import Button from "../../ui/Button";
import propTypes from "prop-types";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
Cabin.propTypes = {
  cabin: propTypes.object,
};

const CabinImage = styled.img`
  max-width: 100px;
  border-radius: 0.25rem;
`;

function Cabin({ cabin }) {
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
    <TableRow>
      <td>
        <CabinImage src={cabin.image} alt={cabin.name} />
      </td>
      <td>{cabin.name}</td>
      <td>{cabin.maxCapacity}</td>
      <td>{cabin.regularPrice}$</td>
      <td>{cabin.discount ? `${cabin.discount} $` : "no discount"}</td>
      <td>
        <Button onClick={() => mutate(cabin.id)} disabled={isDeleting}>
          {isDeleting && <Spinner type="secondary" />}
          <span> Delete</span>
        </Button>
      </td>
    </TableRow>
  );
}

export default Cabin;
