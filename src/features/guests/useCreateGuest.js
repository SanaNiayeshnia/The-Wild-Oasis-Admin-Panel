import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest } from "../../services/apiGuests";
import { useGeneralContext } from "../../contexts/GeneralContext";

function useCreateGuest() {
  const queryClient = useQueryClient();
  const { showModal, handleCloseModal } = useGeneralContext();
  const { isPending, mutate } = useMutation({
    mutationKey: ["guests"],
    mutationFn: createGuest,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("New guest has been created successfully!");
      queryClient.invalidateQueries("guests");
      showModal && handleCloseModal();
    },
  });
  return { isPending, mutate };
}

export default useCreateGuest;
