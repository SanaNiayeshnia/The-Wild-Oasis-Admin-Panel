import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import useSortFilter from "../../hooks/useSortFilter";
import { PAGE_SIZE } from "../../utilities/constants";
import { getSettings } from "../../services/apiSettings";

function useBookings() {
  const filterHandler = (filterName, filterValue) => {
    return !filterValue || filterValue === "all"
      ? null
      : {
          name: filterName,
          value: filterValue,
          func: "eq",
        };
  };
  const { sort, filter, page } = useSortFilter("status", filterHandler);
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
    onError: (err) => toast.error(err),
  });
  const bookings = data?.bookings || [];
  const count = data?.count || 0;

  const queryClient = useQueryClient();
  const pageCount = count / PAGE_SIZE;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  queryClient.prefetchQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { bookings, isLoading, count };
}

export default useBookings;
