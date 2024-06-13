import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useSettings() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    onError: (err) => toast.error(err),
  });
  return { settings, isLoading };
}

export default useSettings;
