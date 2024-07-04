import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("duration")
    ? Number(searchParams.get("duration"))
    : 7;

  const date = new Date();
  date.setDate(date.getDate() - numDays);
  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(date.toISOString()),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked in" || stay.status === "checked out"
  );

  return { isLoading, confirmedStays, stays, numDays };
}

export default useRecentStays;
