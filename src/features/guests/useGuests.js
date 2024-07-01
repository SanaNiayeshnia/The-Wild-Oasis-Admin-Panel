import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utilities/constants";

function useGuests(all) {
  const [searchParams] = useSearchParams();
  const page = all ? null : Number(searchParams.get("page")) || 1;
  const { data, isLoading } = useQuery({
    queryKey: ["guests", page],
    queryFn: () => getGuests({ page }),
    onError: (err) => toast.error(err.message),
  });
  const guests = data?.guests || [];
  const count = data?.count || 0;

  const queryClient = useQueryClient();
  const pageCount = count / PAGE_SIZE;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", page + 1],
      queryFn: () => getGuests({ page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", page - 1],
      queryFn: () => getGuests({ page: page - 1 }),
    });

  return { guests, isLoading, count };
}

export default useGuests;
