import styled from "styled-components";
import Tag from "../ui/Tag";
import {
  HiArrowLeft,
  HiClipboardDocumentCheck,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import BookingDataBox from "../features/bookings/BookingDataBox";
import useUpdateBooking from "../features/bookings/useUpdateBooking";
import Payment from "../features/bookings/Payment";
import Breakfast from "../features/bookings/Breakfast";
import useSettings from "../features/settings/useSettings";
import SelectBox from "../ui/SelectBox";
import Button from "../ui/Button";
import { useGeneralContext } from "../contexts/GeneralContext";
import DeleteConfirmation from "../ui/DeleteConfirmation";
import useDeleteBooking from "../features/bookings/useDeleteBooking";
import useBooking from "../features/bookings/useBooking";
import BookingForm from "../features/bookings/BookingForm";
import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";

const StyledBookingDetail = styled.div`
  padding: 0 1rem;
  max-width: 65rem;
  max-height: min-content;
  margin: auto;
`;
const BookingHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  margin: auto;

  & span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-Gray-800);
    font-weight: 600;
    cursor: pointer;
  }
  & span svg {
    transition: all 0.3s;
  }
  & span:hover svg {
    color: var(--color-green-500);
    transform: scale(1.1);
  }
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:first-child {
    font-size: 1.5rem;
    color: var(--color-Gray-800);
    font-weight: 600;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { handleShowModal } = useGeneralContext();
  const { id } = useParams();
  const { data: booking, isLoading: isLoadingData } = useBooking(id);
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { isPending: isPendingStatus, mutate: changeStatusMutate } =
    useUpdateBooking(id);
  const { isPending: isPendingPayment, mutate: paymentMutate } =
    useUpdateBooking(id);
  const { isPending: isPendingDelete, mutate: deletingMutate } =
    useDeleteBooking();

  function handleChangeStatus(status) {
    const { id: editId, created_at, guests, cabins, ...restBooking } = booking;
    const bookingObj = { ...restBooking, status };

    changeStatusMutate({ editId, bookingObj });
  }

  function handlePayment() {
    const { id, created_at, guests, cabins, ...restBooking } = booking;
    const bookingObj = { ...restBooking, isPaid: true };
    paymentMutate({ id, bookingObj });
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
  function handleUpdate() {
    handleShowModal(
      <BookingForm key={Math.random()} bookingToEdit={booking} />
    );
  }

  useEffect(() => {
    document.title = `${APP_NAME} - Booking ${id}`;
  }, [id]);

  return (
    <StyledBookingDetail>
      <BookingHead>
        <Div>
          <p>Booking#{id}</p>
          {!isLoadingData && (
            <>
              <Tag
                statuses={[
                  { name: "unconfirmed", color: "blue" },
                  { name: "checked in", color: "green" },
                  { name: "checked out", color: "Gray" },
                ]}
                style={{ boxShadow: "0px 0px 5px 0 var(--shadow-color)" }}
              >
                {booking?.status}
              </Tag>
              {isPendingStatus ? (
                <Spinner type="secondary" />
              ) : (
                <SelectBox
                  onChange={(e) => {
                    if (e.target.value === "default") return;
                    handleChangeStatus(e.target.value);
                  }}
                >
                  <option value="default">Change the status</option>
                  {["unconfirmed", "checked in", "checked out"].map(
                    (status, index) =>
                      status !== booking.status && (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      )
                  )}
                </SelectBox>
              )}
            </>
          )}
        </Div>
        <span onClick={() => navigate(-1)}>
          <HiArrowLeft />
          Back
        </span>
      </BookingHead>
      {isLoadingData || isLoadingSettings ? (
        <Spinner type="primary" />
      ) : (
        <>
          <BookingDataBox booking={booking} />
          <Breakfast
            booking={booking}
            breakfastPrice={booking?.extrasPrice || settings?.breakfastPrice}
          />
          <Payment
            booking={booking}
            handlePayment={handlePayment}
            isPendingPayment={isPendingPayment}
          />
          <ButtonContainer>
            <Button className="quaternary" onClick={handleUpdate}>
              <HiClipboardDocumentCheck />
              Update
            </Button>
            <Button className="tertiary" onClick={handleDelete}>
              {isPendingDelete ? <Spinner type="secondary" /> : <HiTrash />}
              Delete
            </Button>
          </ButtonContainer>
        </>
      )}
    </StyledBookingDetail>
  );
}

export default BookingDetail;
