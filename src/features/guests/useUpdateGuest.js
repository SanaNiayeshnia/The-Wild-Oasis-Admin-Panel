import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGeneralContext } from "../../contexts/GeneralContext";
import { updateGuest } from "../../services/apiGuests";

function useUpdateGuest() {
  const queryClient = useQueryClient();
  const { showModal, handleCloseModal } = useGeneralContext();
  const { isPending, mutate } = useMutation({
    mutationKey: ["guests"],
    mutationFn: updateGuest,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("The guest info has been updated successfully!");
      queryClient.invalidateQueries("guests");
      showModal && handleCloseModal();
    },
  });
  return { isPending, mutate };
}

export default useUpdateGuest;
