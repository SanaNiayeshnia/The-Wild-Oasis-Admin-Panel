import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();
  const { isPending: isPendingLogout, mutate: logoutMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: logout,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("You've logged out successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { isPendingLogout, logoutMutate };
}

export default useLogout;
