import TableRow from "../../ui/table/TableRow";
import Tbody from "../../ui/table/Tbody";
import Thead from "../../ui/table/Thead";
import Cabin from "./Cabin";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/table/Table";
import Pagination from "../../ui/Pagination";
import useCabins from "./useCabins";

function CabinTable() {
  const { cabins, count, isLoading } = useCabins();
  return (
    <>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <>
          <Table>
            <Thead>
              <TableRow gridcols="1fr 1fr 2fr 1fr 1fr 1fr">
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
                <Cabin key={cabin.id} cabin={cabin} />
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
