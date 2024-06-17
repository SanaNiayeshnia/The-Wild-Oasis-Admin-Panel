import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

export default useUser;
