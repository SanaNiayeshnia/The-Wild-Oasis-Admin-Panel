import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("duration")
    ? Number(searchParams.get("duration"))
    : 90;
  const date = new Date();
  date.setDate(date.getDate() - numDays);
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(date.toISOString()),
  });

  return { isLoading, bookings };
}

export default useRecentBookings;
