import styled from "styled-components";
import TableRow from "./TableRow";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { getCabins } from "../../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import Cabin from "../Cabin";
import Spinner from "../../../ui/Spinner";
import toast from "react-hot-toast";

const StyledCabinTable = styled.table`
  min-width: 100%;
  border: 2px solid var(--color-Gray-200);
  outline: none;
  border-radius: 0.75rem;
  margin: auto;
  overflow: hidden;
  border-spacing: 0;
  background-color: white;
  box-shadow: 0px 0px 8px 0 #cbd5e1;
`;

function CabinTable() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    onError: (err) => toast.error(err.message),
  });
  return (
    <>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <StyledCabinTable>
          <Thead>
            <TableRow>
              <th></th>
              <th>Cabin</th>
              <th>Capixity</th>
              <th>Price</th>
              <th>Discount</th>
              <th></th>
            </TableRow>
          </Thead>
          <Tbody>
            {cabins?.map((cabin) => (
              <Cabin key={cabin.id} cabin={cabin} />
            ))}
          </Tbody>
        </StyledCabinTable>
      )}
    </>
  );
}

export default CabinTable;
