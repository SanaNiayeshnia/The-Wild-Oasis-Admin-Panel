import { useState } from "react";
import CheckBox from "../../ui/CheckBox";
import Spinner from "../../ui/Spinner";
import { formatPrice } from "../../utilities/helper";
import useUpdateBooking from "./useUpdateBooking";

function Breakfast({ booking, breakfastPrice }) {
  const { isPending, mutate } = useUpdateBooking(booking.id);
  const isDisabled = booking.status === "checked out";
  const [hasBreakfastInput, setHasBreakfastInput] = useState(
    booking?.hasBreakfast
  );

  function handleAddBreakfast() {
    const { id, created_at, guests, cabins, ...restBooking } = booking;
    const hasBreakfast = !restBooking.hasBreakfast;
    const bookingObj = {
      ...restBooking,
      hasBreakfast,
      extrasPrice: hasBreakfast ? breakfastPrice : 0,
      totalPrice: hasBreakfast
        ? restBooking.cabinPrice + breakfastPrice
        : restBooking.cabinPrice,
      isPaid: hasBreakfast ? false : restBooking.isPaid,
    };
    mutate({ id, bookingObj });
  }

  return (
    <CheckBox state={isDisabled ? "true" : "false"}>
      {isPending ? (
        <Spinner type="secondary" />
      ) : (
        <input
          type="checkbox"
          onChange={(e) => {
            setHasBreakfastInput(e.target.checked);
            handleAddBreakfast();
          }}
          checked={hasBreakfastInput}
          disabled={isDisabled}
          id="paymentCheckBox"
        />
      )}

      <label htmlFor="paymentCheckBox">
        Want to add breakfast for {formatPrice(breakfastPrice)}
      </label>
    </CheckBox>
  );
}

export default Breakfast;
