import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useGeneralContext } from "../../contexts/GeneralContext";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { showModal, handleCloseModal } = useGeneralContext();
  const { isPending, mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User Profile has been updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showModal && handleCloseModal();
    },
    onError: (err) => {
      toast.error(err.message);
      showModal && handleCloseModal();
    },
  });
  return { isPending, mutate };
}

export default useUpdateUser;
