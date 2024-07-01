import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteGuest } from "../../services/apiGuests";
import { useGeneralContext } from "../../contexts/GeneralContext";

function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { showModal, handleCloseModal } = useGeneralContext();
  const { isPending, mutate } = useMutation({
    mutationKey: ["guests"],
    mutationFn: deleteGuest,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(`Guest ${data?.fullName} has been deleted successfully!`);
      queryClient.invalidateQueries("guests");
      showModal && handleCloseModal();
    },
  });
  return { isPending, mutate };
}

export default useDeleteGuest;
