import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiGuests";

function useCountries() {
  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  return { countries, isLoading };
}

export default useCountries;
