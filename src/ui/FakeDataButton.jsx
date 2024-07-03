import { addDays, isBefore, subDays, isSameDay } from "date-fns";
import { countNights, getToday } from "../utilities/helper";
import Button from "./Button";
import Spinner from "./Spinner";
import useSettings from "../features/settings/useSettings";
import useCabins from "../features/cabins/useCabins";
import useGuests from "../features/guests/useGuests";
import useCreateFakeBookings from "../features/bookings/useCreateFakeBookings";

function FakeDataButton() {
  const { isPending, mutate } = useCreateFakeBookings();
  const { settings } = useSettings();
  const { cabins } = useCabins(true);
  const { guests } = useGuests(true);
  const breakfastPrice = settings?.breakfastPrice || 0;
  const maxBookingLength = settings?.maxBookingLength || 30;
  const minBookingLength = settings?.minBookingLength || 1;
  const maxGuestsPerBooking = settings?.maxGuestsPerBooking || 8;

  function addFakeBookingData() {
    const today = getToday();
    const arr = Array.from({ length: 100 });
    const bookings = arr.map((item, index) => {
      const created_at = subDays(today, Math.random() * 60);
      let startDate, endDate;
      if (index >= 95) {
        startDate = subDays(today, Math.floor(Math.random() * (5 - 1) + 1));
        endDate = today;
      } else if (index >= 90 && index < 95) {
        startDate = subDays(today, Math.floor(Math.random() * 3));
        endDate = addDays(startDate, Math.floor(Math.random() * 5));
      } else {
        startDate = addDays(created_at, Math.floor(Math.random() * 100));
        endDate = addDays(
          startDate,
          Math.floor(
            Math.random() * (maxBookingLength - minBookingLength + 1) +
              minBookingLength
          )
        );
      }
      const numNights = countNights(startDate, endDate);
      const numGuests = Math.floor(
        Math.random() * (maxGuestsPerBooking - 1) + 1
      );
      let status;

      if (isBefore(endDate, today)) {
        status = "checked out";
      } else if (
        isBefore(startDate, today) &&
        (isBefore(today, endDate) || isSameDay(today, endDate))
      ) {
        status = "checked in";
      } else {
        status = "unconfirmed";
      }

      const cabin = cabins[Math.floor(Math.random() * cabins.length)];
      const guest = guests[Math.floor(Math.random() * guests.length)];
      const hasBreakfast = Math.random() >= 0.5;
      const isPaid = status === "checked out" ? true : Math.random() >= 0.5;
      const cabinPrice = (cabin?.regularPrice - cabin?.discount) * numNights;
      const extrasPrice = hasBreakfast ? breakfastPrice * numNights : 0;
      const totalPrice = cabinPrice + extrasPrice;
      return {
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        status,
        hasBreakfast,
        isPaid,
        cabinPrice,
        extrasPrice,
        totalPrice,
        cabinId: cabin?.id,
        guestId: guest?.id,
        observation: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      };
    });
    mutate(bookings);
  }

  return (
    <Button className="secondary" onClick={addFakeBookingData}>
      {isPending && <Spinner type="secondary" />}Create Fake Data
    </Button>
  );
}

export default FakeDataButton;
