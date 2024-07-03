import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import useSortFilter from "../../hooks/useSortFilter";
import { PAGE_SIZE } from "../../utilities/constants";

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
  const { sort, filter, page, searchQuery } = useSortFilter(
    "status",
    filterHandler
  );
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filter, sort, page, searchQuery],
    queryFn: () => getBookings({ filter, sort, page, searchQuery }),
    onError: (err) => toast.error(err),
  });
  const bookings = data?.bookings || [];
  const count = data?.count || 0;

  const queryClient = useQueryClient();
  const pageCount = count / PAGE_SIZE;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1, searchQuery],
      queryFn: () => getBookings({ filter, sort, page: page + 1, searchQuery }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1, searchQuery],
      queryFn: () => getBookings({ filter, sort, page: page - 1, searchQuery }),
    });

  return { bookings, isLoading, count };
}

export default useBookings;
