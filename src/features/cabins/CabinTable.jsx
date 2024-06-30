import TableRow from "../../ui/table/TableRow";
import Tbody from "../../ui/table/Tbody";
import Thead from "../../ui/table/Thead";
import Cabin from "./Cabin";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/table/Table";
import Pagination from "../../ui/Pagination";
import useCabins from "./useCabins";
import { useState } from "react";
import NothingFound from "../../ui/NothingFound";
import Button from "../../ui/Button";
import { useGeneralContext } from "../../contexts/GeneralContext";
import styled from "styled-components";
import CabinForm from "./CabinForm";

const Div = styled.div`
  margin: 0 auto;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`;

function CabinTable() {
  const { cabins, count, isLoading } = useCabins();
  const [openContextId, setOpenContextId] = useState(null);
  const { handleShowModal } = useGeneralContext();

  return (
    <>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <>
          {count === 0 ? (
            <NothingFound />
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
              <Div>
                <Button
                  className="secondary"
                  onClick={() => {
                    handleShowModal(
                      <CabinForm key={Math.random()} cabinToEdit={{}} />
                    );
                  }}
                >
                  Add New Cabin
                </Button>
              </Div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default CabinTable;
