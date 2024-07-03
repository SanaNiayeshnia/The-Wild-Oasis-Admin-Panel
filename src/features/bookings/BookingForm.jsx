import styled from "styled-components";
import Error from "../../ui/Error";
import Form from "../../ui/form/Form";
import FormField from "../../ui/form/FormField";
import FormHead from "../../ui/form/FormHead";
import Input from "../../ui/form/Input";
import Textarea from "../../ui/form/Textarea";
import Button from "../../ui/Button";
import { useGeneralContext } from "../../contexts/GeneralContext";
import useCabins from "../cabins/useCabins";
import useGuests from "../guests/useGuests";
import {
  countNights,
  formatDateForHTMLInput,
  formatPrice,
} from "../../utilities/helper";
import { useForm, useWatch } from "react-hook-form";
import useSettings from "../settings/useSettings";
import useCreateBooking from "./useCreateBooking";
import Spinner from "../../ui/Spinner";
import useUpdateBooking from "./useUpdateBooking";

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;
const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  & label {
    color: var(--color-Gray-900);
  }
  &:not(.last) {
    border-bottom: 2px solid var(--color-Gray-100);
  }
  & div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  & input[type="checkbox"] {
    accent-color: var(--color-green-500);
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
`;

function BookingForm({ bookingToEdit = {} }) {
  const {
    id: editId,
    cabins: cabinToEdit,
    guests: guestToEdit,
    startDate: startDateToEdit,
    endDate: endDateToEdit,
    ...restEditValues
  } = bookingToEdit;

  const isEditSession = Boolean(editId);
  const { handleCloseModal } = useGeneralContext();
  const { cabins, isLoading: isLoadingCabins } = useCabins(true);
  cabins?.sort((a, b) => a.name - b.name);
  const { guests, isLoading: isLoadingGuests } = useGuests(true);
  guests?.sort((a, b) => a.fullName.localeCompare(b.fullName));

  const { settings } = useSettings();
  const breakfastPrice = settings?.breakfastPrice;
  const maxGuestsPerBooking = settings?.maxGuestsPerBooking;
  const minBookingLength = settings?.minBookingLength;
  const maxBookingLength = settings?.maxBookingLength;
  const { register, control, formState, handleSubmit } = useForm({
    defaultValues: isEditSession
      ? {
          ...restEditValues,
          cabin: cabinToEdit?.name,
          guest: guestToEdit?.fullName,
          startDate: formatDateForHTMLInput(startDateToEdit),
          endDate: formatDateForHTMLInput(endDateToEdit),
        }
      : {},
  });
  const { errors } = formState;
  const watchedValues = useWatch({ control });
  const selectedCabin = cabins?.find(
    (cabin) => cabin?.name === watchedValues?.cabin
  );
  const selectedGuest = guests?.find(
    (guest) => guest?.fullName === watchedValues?.guest
  );
  const numNights = countNights(
    new Date(watchedValues?.startDate),
    new Date(watchedValues?.endDate)
  );
  const cabinPrice =
    (selectedCabin?.regularPrice - selectedCabin?.discount) * numNights;
  const extrasPrice = watchedValues?.hasBreakfast
    ? breakfastPrice * numNights
    : 0;
  const totalPrice = cabinPrice + extrasPrice;
  const { mutate: createBookingMutate, isPending: isPendingCreate } =
    useCreateBooking();
  const { mutate: updateBookingMutate, isPending: isPendingUpdate } =
    useUpdateBooking(editId);

  function onSubmit(data) {
    const {
      startDate,
      endDate,
      hasBreakfast,
      numGuests,
      status,
      cabin,
      guest,
      ...rest
    } = data;
    const bookingObj = {
      ...rest,
      cabinId: selectedCabin?.id,
      guestId: selectedGuest?.id,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status: isEditSession ? status : "unconfirmed",
      numGuests: Number(numGuests),
      hasBreakfast,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      numNights,
    };
    if (isEditSession) updateBookingMutate({ editId, bookingObj });
    else createBookingMutate(bookingObj);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHead>Add New Booking</FormHead>
      <FormField label="Cabin">
        <Input
          list="cabinsList"
          id="Cabin"
          {...register("cabin", {
            required: "This field can't be empty!",
            validate: (value) =>
              cabins.some((cabin) => cabin.name === value) ||
              "You should select an available cabin!",
          })}
        />
        <datalist id="cabinsList">
          {cabins?.map((cabin) => (
            <option value={cabin.name} key={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </datalist>
        <Error>{errors?.cabin?.message}</Error>
      </FormField>
      <FormField label="Guest">
        <Input
          list="guestsList"
          id="Guest"
          {...register("guest", {
            required: "This field can't be empty!",
            validate: (value) =>
              guests.some((guest) => guest.fullName === value) ||
              "You should select an already defined user!",
          })}
        />
        <datalist id="guestsList">
          {guests?.map((guest) => (
            <option value={guest.fullName} key={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </datalist>
        <Error>{errors?.guest?.message}</Error>
      </FormField>

      <Container>
        <div>
          <label htmlFor="startDate">Start Date :</label>
          <Input
            type="date"
            id="startDate"
            {...register("startDate", {
              validate: (value) => {
                if (isEditSession) return true;
                const startDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (startDate < today) {
                  return "The start date cannot be in the past!";
                }
                return true;
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date :</label>
          <Input
            type="date"
            id="endDate"
            {...register("endDate", {
              validate: (value) => {
                const startDate = new Date(watchedValues?.startDate);
                const endDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const nights = countNights(startDate, endDate);

                if (endDate <= today) {
                  return isEditSession
                    ? true
                    : "The end date must be later than today's date!";
                }
                if (endDate <= startDate) {
                  return "The end date must be later than the start date!";
                }
                if (nights < minBookingLength) {
                  return `You can't reserve for less than ${minBookingLength} nights!`;
                }
                if (nights > maxBookingLength) {
                  return `You can't reserve for more than ${maxBookingLength} nights!`;
                }
                return true;
              },
            })}
          />
        </div>
        <Error>{errors?.startDate?.message || errors?.endDate?.message}</Error>
      </Container>

      <FormField label="Number of guests">
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field can't be empty!",
            min: {
              value: 1,
              message: "Number of guests should be greater than 1!",
            },
            max: {
              value: maxGuestsPerBooking,
              message: `Number of guests can't be greater thab ${maxGuestsPerBooking}`,
            },
          })}
        />
        <Error>{errors?.numGuests?.message}</Error>
      </FormField>
      {isEditSession && (
        <FormField label="Status">
          <select id="status" {...register("status")}>
            <option value="unconfirmed">unconfirmed</option>
            <option value="checked in">checked in</option>
            <option value="checked out">checked out</option>
          </select>
        </FormField>
      )}

      <FormField label="Observation">
        <Textarea id="observation" rows={2} {...register("observation")} />
        <Error>{errors?.observation?.message}</Error>
      </FormField>
      <Container className="last">
        <Container className="last">
          <div>
            <label htmlFor="hasBreakfast">Want breakfast?</label>
            <Input
              type="checkbox"
              id="hasBreakfast"
              {...register("hasBreakfast")}
            />
          </div>
        </Container>

        {watchedValues.cabin &&
          watchedValues.startDate &&
          watchedValues.endDate &&
          watchedValues?.endDate > watchedValues?.startDate && (
            <Container className="last">
              <div>
                <label htmlFor="isPaid">
                  Has total price of {formatPrice(totalPrice)} been paid?
                </label>
                <Input type="checkbox" id="isPaid" {...register("isPaid")} />
              </div>
            </Container>
          )}
      </Container>

      <Div>
        <Button
          className="primary"
          type="reset"
          onClick={handleCloseModal}
          disabled={isPendingCreate || isPendingUpdate}
        >
          Cancel
        </Button>
        <Button
          className="secondary"
          type="submit"
          disabled={isPendingCreate || isPendingUpdate}
        >
          {(isPendingCreate || isPendingUpdate) && <Spinner type="secondary" />}
          {isEditSession ? "Update Booking" : "Add booking"}
        </Button>
      </Div>
    </Form>
  );
}

export default BookingForm;
