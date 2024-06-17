import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("You've logged in successfully!");

      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isPending, loginMutate };
}

export default useLogin;
