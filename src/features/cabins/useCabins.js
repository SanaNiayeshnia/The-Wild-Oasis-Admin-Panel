import toast from "react-hot-toast";
import { getCabins } from "../../services/apiCabins";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useSortFilter from "../../hooks/useSortFilter";
import { PAGE_SIZE } from "../../utilities/constants";

function useCabins(all = false) {
  const filterHandler = (filterName, filterValue) => {
    return !filterValue || filterValue === "all"
      ? null
      : filterValue === "with discount"
      ? {
          name: filterName,
          value: 0,
          func: "gt",
        }
      : {
          name: filterName,
          value: 0,
          func: "eq",
        };
  };

  const { sort, filter, page: p } = useSortFilter("discount", filterHandler);
  const page = all ? null : p;
  const { data, isLoading } = useQuery({
    queryKey: ["cabins", page, sort, filter],
    queryFn: () => getCabins({ page, filter, sort }),
    onError: (err) => toast.error(err.message),
  });
  const cabins = data?.cabins || [];
  const count = data?.count || 0;

  const queryClient = useQueryClient();
  const pageCount = count / PAGE_SIZE;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["cabins", page + 1, sort, filter],
      queryFn: () => getCabins({ page: page + 1, filter, sort }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["cabins", page - 1, sort, filter],
      queryFn: () => getCabins({ page: page - 1, filter, sort }),
    });
  return { cabins, count, isLoading };
}

export default useCabins;
