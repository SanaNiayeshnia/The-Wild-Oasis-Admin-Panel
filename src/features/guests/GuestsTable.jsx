import { useState } from "react";
import Button from "../../ui/Button";
import NothingFound from "../../ui/NothingFound";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/table/Table";
import TableRow from "../../ui/table/TableRow";
import Tbody from "../../ui/table/Tbody";
import Thead from "../../ui/table/Thead";
import Guest from "./Guest";
import useGuests from "./useGuests";

function GuestsTable() {
  const [openContextId, setOpenContextId] = useState();
  const { guests, isLoading, count } = useGuests();
  return (
    <>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <>
          <>
            {count === 0 ? (
              <NothingFound />
            ) : (
              <Table>
                <Thead>
                  <TableRow gridcols="2fr 2fr 1fr 1fr 0.1fr">
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Nationality</th>
                    <th>National ID</th>
                    <th></th>
                  </TableRow>
                </Thead>
                <Tbody>
                  {guests?.map((guest) => (
                    <Guest
                      guest={guest}
                      key={guest.id}
                      openContextId={openContextId}
                      setOpenContextId={setOpenContextId}
                    />
                  ))}
                </Tbody>
                <Pagination count={count} />
              </Table>
            )}
          </>
          {/* <Div>
            <Button
              className="secondary"
              onClick={() => {
                handleShowModal(<BookingForm key={Math.random()} />);
              }}
            >
              <HiPlus />
              Add New User
            </Button>
          </Div> */}
        </>
      )}
    </>
  );
}

export default GuestsTable;
