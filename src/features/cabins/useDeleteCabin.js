import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteCabin(setOpenContextId) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: (data) => {
      toast.success(`Cabin ${data.name} has been deleted.`);
      setOpenContextId && setOpenContextId(null);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      navigate("/cabins");
    },
    onError: (err) => {
      toast.error(err.message);
      setOpenContextId && setOpenContextId(null);
    },
  });
  return { isDeleting, mutate };
}

export default useDeleteCabin;
