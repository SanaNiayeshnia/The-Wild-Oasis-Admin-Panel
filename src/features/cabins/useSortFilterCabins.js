import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useSortFilterCabins(cabins) {
  const [searchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount");
  const sortFilter = searchParams.get("sortby");
  const [sortedCabins, setSortedCabins] = useState([]);

  useEffect(() => {
    if (cabins) {
      switch (sortFilter) {
        case "name-asc":
          setSortedCabins(
            [...cabins].sort((a, b) => a.name.localeCompare(b.name))
          );
          break;
        case "name-desc":
          setSortedCabins(
            [...cabins].sort((a, b) => b.name.localeCompare(a.name))
          );
          break;
        case "regularPrice-asc":
          setSortedCabins(
            [...cabins].sort((a, b) => a.regularPrice - b.regularPrice)
          );
          break;
        case "regularPrice-desc":
          setSortedCabins(
            [...cabins].sort((a, b) => b.regularPrice - a.regularPrice)
          );
          break;
        case "maxCapacity-asc":
          setSortedCabins(
            cabins?.sort((a, b) => a.maxCapacity - b.maxCapacity)
          );
          break;
        case "maxCapacity-desc":
          setSortedCabins(
            [...cabins].sort((a, b) => b.maxCapacity - a.maxCapacity)
          );
          break;
      }
    }
  }, [sortFilter, cabins]);

  return { discountFilter, sortedCabins };
}

export default useSortFilterCabins;
