import Table from "../../ui/table/Table";
import TableRow from "../../ui/table/TableRow";
import Tbody from "../../ui/table/Tbody";
import Thead from "../../ui/table/Thead";
import Booking from "./Booking";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";
import { useState } from "react";

function BookingsTable() {
  const { bookings, isLoading, count } = useBookings();
  const [openContextId, setOpenContextId] = useState(null);

  return (
    <>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <Table>
          <Thead>
            <TableRow gridcols="1fr 2fr 2fr 1fr 1fr 0.1fr">
              <th>Cabin</th>
              <th>Guest</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Amount</th>
              <th></th>
            </TableRow>
          </Thead>
          <Tbody>
            {bookings?.map((booking) => (
              <Booking
                key={booking.id}
                booking={booking}
                openContextId={openContextId}
                setOpenContextId={setOpenContextId}
              />
            ))}
          </Tbody>
          <Pagination count={count} />
        </Table>
      )}
    </>
  );
}

export default BookingsTable;
