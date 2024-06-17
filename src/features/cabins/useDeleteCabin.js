import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin(setOpenContextId) {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: (data) => {
      toast.success(`Cabin ${data.name} has been deleted.`);
      setOpenContextId && setOpenContextId(null);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      setOpenContextId && setOpenContextId(null);
    },
  });
  return { isDeleting, mutate };
}

export default useDeleteCabin;
