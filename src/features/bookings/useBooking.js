import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useBooking(id) {
  const { isLoading, data } = useQuery({
    queryKey: [`booking/${id}`],
    queryFn: () => getBooking(id),
    onError: () => toast.error("Couldn't load the booking info!"),
  });
  return { isLoading, data };
}

export default useBooking;
