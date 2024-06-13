import TableRow from "../../ui/table/TableRow";
import Tbody from "../../ui/table/Tbody";
import Thead from "../../ui/table/Thead";
import Cabin from "./Cabin";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/table/Table";
import Pagination from "../../ui/Pagination";
import useCabins from "./useCabins";
import { useState } from "react";

function CabinTable() {
  const { cabins, count, isLoading } = useCabins();
  const [openContextId, setOpenContextId] = useState(null);
  return (
    <>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <>
          <Table>
            <Thead>
              <TableRow gridcols="1fr 1fr 2fr 1fr 1fr 0.1fr">
                <th></th>
                <th>Cabin</th>
                <th>Capixity</th>
                <th>Price</th>
                <th>Discount</th>
                <th></th>
              </TableRow>
            </Thead>
            <Tbody>
              {cabins.map((cabin) => (
                <Cabin
                  key={cabin.id}
                  cabin={cabin}
                  openContextId={openContextId}
                  setOpenContextId={setOpenContextId}
                />
              ))}
            </Tbody>
            <Pagination count={count} />
          </Table>
        </>
      )}
    </>
  );
}

export default CabinTable;
