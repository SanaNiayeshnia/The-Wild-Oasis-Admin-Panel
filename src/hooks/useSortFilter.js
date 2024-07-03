import { useSearchParams } from "react-router-dom";

function useSortFilter(filterName = "", filterHandler) {
  const [searchParams] = useSearchParams();
  const page =
    searchParams.get("page") === null ? 1 : Number(searchParams.get("page"));
  const filterValue = searchParams.get(filterName)?.replace("-", " ");
  const filter = filterHandler && filterHandler(filterName, filterValue);
  const sortFilter = searchParams.get("sortby");
  const sort = !sortFilter
    ? { name: "created_at", type: "desc" }
    : {
        name: sortFilter.split("-")[0],
        type: sortFilter.split("-")[1],
      };
  const searchQuery = searchParams.get("query");
  return { sort, filter, page, searchQuery };
}

export default useSortFilter;
