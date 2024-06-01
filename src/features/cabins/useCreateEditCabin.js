import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useGeneralContext } from "../../contexts/GeneralContext";

function useCreateEditCabin(isEditSession = false) {
  const { showModal, handleCloseModal } = useGeneralContext();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: createEditCabin,
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success(
        isEditSession
          ? `Cabin ${data.name} has been updated successfully!`
          : `New Cabin has been created successfully!`
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      showModal && handleCloseModal();
    },
  });
  return { isPending, mutate };
}

export default useCreateEditCabin;
