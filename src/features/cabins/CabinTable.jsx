import styled from "styled-components";
import TableRow from "../../ui/table/TableRow";
import Tbody from "../../ui/table/Tbody";
import Thead from "../../ui/table/Thead";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import Cabin from "./Cabin";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import useSortCabins from "./useSortFilterCabins";

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
  const { discountFilter, sortedCabins } = useSortCabins(cabins);
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
            {sortedCabins?.map((cabin) => {
              switch (discountFilter) {
                case "all":
                  return <Cabin key={cabin.id} cabin={cabin} />;
                case "no-discount":
                  return (
                    cabin.discount === 0 && (
                      <Cabin key={cabin.id} cabin={cabin} />
                    )
                  );
                case "with-discount":
                  return (
                    cabin.discount !== 0 && (
                      <Cabin key={cabin.id} cabin={cabin} />
                    )
                  );
              }
            })}
          </Tbody>
        </StyledCabinTable>
      )}
    </>
  );
}

export default CabinTable;
