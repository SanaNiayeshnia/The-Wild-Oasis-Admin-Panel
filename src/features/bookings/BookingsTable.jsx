import Table from "../../ui/table/Table";
import TableRow from "../../ui/table/TableRow";
import Tbody from "../../ui/table/Tbody";
import Thead from "../../ui/table/Thead";
import Booking from "./Booking";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";
import { useState } from "react";
import NothingFound from "../../ui/NothingFound";
import Button from "../../ui/Button";
import { HiPlus } from "react-icons/hi";
import styled from "styled-components";
import { useGeneralContext } from "../../contexts/GeneralContext";
import BookingForm from "./BookingForm";

const Div = styled.div`
  margin: 0 auto;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`;

function BookingsTable() {
  const { bookings, isLoading, count } = useBookings();
  const [openContextId, setOpenContextId] = useState(null);
  const { handleShowModal } = useGeneralContext();
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
          <Div>
            <Button
              className="secondary"
              onClick={() => {
                handleShowModal(<BookingForm key={Math.random()} />);
              }}
            >
              <HiPlus />
              Add New Booking
            </Button>
          </Div>
        </>
      )}
    </>
  );
}

export default BookingsTable;
