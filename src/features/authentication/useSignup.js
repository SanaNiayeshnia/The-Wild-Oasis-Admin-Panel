import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useGeneralContext } from "../../contexts/GeneralContext";

function useSignup() {
  const { handleCloseModal } = useGeneralContext();
  const { isPending, mutate: signupMutate } = useMutation({
    mutationKey: ["users"],
    mutationFn: signUp,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success(
        "Account has been created successfully! Please verify the new account from the user's email address."
      );
      handleCloseModal();
    },
  });
  return { isPending, signupMutate };
}

export default useSignup;
