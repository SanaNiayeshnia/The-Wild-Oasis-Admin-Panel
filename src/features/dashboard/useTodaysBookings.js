import { useQuery } from "@tanstack/react-query";
import { getTodaysBookings } from "../../services/apiBookings";

function useTodaysBookings() {
  const { isLoading, data } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getTodaysBookings,
  });

  const todaysBookings = data?.todaysBookings || [];
  const count = data?.count || 0;

  return { isLoading, todaysBookings, count };
}

export default useTodaysBookings;
