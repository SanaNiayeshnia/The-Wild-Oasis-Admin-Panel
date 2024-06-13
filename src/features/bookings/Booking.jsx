import TableRow from "../../ui/table/TableRow";
import styled from "styled-components";
import propTypes from "prop-types";
import Tag from "../../ui/Tag";
import {
  arrivingDay,
  countNights,
  formatDate,
  formatPrice,
} from "../../utilities/helper";
import { HiDotsVertical, HiEye } from "react-icons/hi";
import LastTd from "../../ui/table/LastTd";
import { useEffect, useState } from "react";
import ContextMenu from "../../ui/ContextMenu";
import { useNavigate } from "react-router-dom";
import {
  HiBriefcase,
  HiClipboardDocumentCheck,
  HiTrash,
} from "react-icons/hi2";
import useUpdateBooking from "./useUpdateBooking";
import Spinner from "../../ui/Spinner";
import DeleteConfirmation from "../cabins/DeleteConfirmation";
import { useGeneralContext } from "../../contexts/GeneralContext";
import useDeleteBooking from "./useDeleteBooking";

const GuestDateTd = styled.td`
  & p {
    margin: 0;
  }
  & :last-child {
    color: var(--color-Gray-500);
    font-size: 0.9rem;
  }
`;

Booking.propTypes = {
  booking: propTypes.object,
};

function Booking({ booking, openContextId, setOpenContextId }) {
  const { handleShowModal } = useGeneralContext();
  const {
    guests: guestInfo,
    cabins: cabinInfo,
    status,
    totalPrice,
    startDate,
    endDate,
  } = booking;
  const { name: cabinName } = cabinInfo;
  const { fullName: guestName, email: guestEmail } = guestInfo;
  const [showContext, setShowContext] = useState(false);
  const navigate = useNavigate();
  const {
    month: startMonth,
    year: startYear,
    date: sDate,
  } = formatDate(startDate);
  const { month: endMonth, year: endYear, date: eDate } = formatDate(endDate);

  const { isPending: isPendingStatus, mutate: changeStatusMutate } =
    useUpdateBooking(booking.id, setShowContext);

  const { isPending: isPendingDelete, mutate: deletingMutate } =
    useDeleteBooking();

  function handleChangeStatus(status) {
    const { id, created_at, guests, cabins, ...restBooking } = booking;
    const bookingObj = { ...restBooking, status };

    changeStatusMutate({ id, bookingObj });
  }

  function handleDelete() {
    handleShowModal(
      <DeleteConfirmation
        whatToDelete="booking"
        object={booking}
        deletingMutate={deletingMutate}
      />
    );
  }

  return (
    <TableRow gridcols="1fr 2fr 2fr 1fr 1fr 0.1fr">
      <td>{cabinName}</td>
      <GuestDateTd>
        <p>{guestName}</p>
        <p>{guestEmail}</p>
      </GuestDateTd>
      <GuestDateTd>
        <p>
          {arrivingDay(startDate)} - {countNights(startDate, endDate)} night
          stay
        </p>
        <p>
          {startMonth} {sDate} {startYear} - {endMonth} {eDate} {endYear}
        </p>
      </GuestDateTd>
      <td>
        <Tag
          statuses={[
            { name: "unconfirmed", color: "blue" },
            { name: "checked in", color: "green" },
            { name: "checked out", color: "Gray" },
          ]}
        >
          {status}
        </Tag>
      </td>
      <td>{formatPrice(totalPrice)}</td>
      <LastTd>
        <HiDotsVertical
          onClick={() => {
            setShowContext((showContext) => !showContext);
            setOpenContextId(booking.id);
          }}
        />
        {showContext === true && openContextId === booking.id && (
          <ContextMenu setShowContext={setShowContext}>
            <li onClick={() => navigate(`${booking.id}`)}>
              <HiEye />
              See Details
            </li>
            {booking?.status === "unconfirmed" && (
              <li onClick={() => handleChangeStatus("checked in")}>
                {isPendingStatus ? (
                  <Spinner type="secondary" />
                ) : (
                  <HiClipboardDocumentCheck />
                )}
                check in
              </li>
            )}
            {booking?.status === "checked in" && (
              <li onClick={() => handleChangeStatus("checked out")}>
                {isPendingStatus ? (
                  <Spinner type="secondary" />
                ) : (
                  <HiBriefcase />
                )}
                check out
              </li>
            )}
            <li onClick={handleDelete}>
              {isPendingDelete ? <Spinner type="secondary" /> : <HiTrash />}
              delete
            </li>
          </ContextMenu>
        )}
      </LastTd>
    </TableRow>
  );
}

export default Booking;
