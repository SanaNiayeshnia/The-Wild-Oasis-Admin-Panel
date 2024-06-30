import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCabin } from "../../services/apiCabins";

function useCabin(id) {
  const { isLoading, data } = useQuery({
    queryKey: [`cabin/${id}`],
    queryFn: () => getCabin(id),
    onError: () => toast.error("Couldn't load the cabin info!"),
  });
  return { isLoading, data };
}

export default useCabin;
