import Spinner from "../../ui/Spinner";
import { formatPrice } from "../../utilities/helper";
import CheckBox from "../../ui/CheckBox";
import { useEffect, useState } from "react";

function Payment({ booking, handlePayment, isPendingPayment }) {
  const isDisabled = booking?.isPaid;
  const [isPaidInput, setIsPaidInput] = useState(booking?.isPaid);
  useEffect(() => {
    setIsPaidInput(booking?.isPaid);
  }, [booking?.isPaid]);

  return (
    <CheckBox state={isDisabled ? "true" : "false"}>
      {isPendingPayment ? (
        <Spinner type="secondary" />
      ) : (
        <input
          type="checkbox"
          onChange={(e) => {
            setIsPaidInput(e.target.checked);
            handlePayment();
          }}
          disabled={isDisabled}
          checked={isPaidInput}
          id="paymentCheckBox"
        />
      )}

      <label htmlFor="paymentCheckBox">
        I confirm that {booking.guests?.fullName} has paid the total amount of{" "}
        {formatPrice(booking.totalPrice)}
      </label>
    </CheckBox>
  );
}

export default Payment;
