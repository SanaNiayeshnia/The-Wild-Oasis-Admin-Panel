import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import toast from "react-hot-toast";
import { PAGE_SIZE } from "../../utilities/constants";
import useSortFilter from "../../hooks/useSortFilter";

function useGuests(all) {
  const { page: p, sort } = useSortFilter();
  const page = all ? null : p;
  const { data, isLoading } = useQuery({
    queryKey: ["guests", page, sort],
    queryFn: () => getGuests({ page, sort }),
    onError: (err) => toast.error(err.message),
  });
  const guests = data?.guests || [];
  const count = data?.count || 0;

  const queryClient = useQueryClient();
  const pageCount = count / PAGE_SIZE;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", page + 1, sort],
      queryFn: () => getGuests({ page: page + 1, sort }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", page - 1, sort],
      queryFn: () => getGuests({ page: page - 1, sort }),
    });

  return { guests, isLoading, count };
}

export default useGuests;
