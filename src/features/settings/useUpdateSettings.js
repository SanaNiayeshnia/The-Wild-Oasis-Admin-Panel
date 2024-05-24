import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdaing, mutate } = useMutation({
    mutationKey: ["settings"],
    mutationFn: updateSettings,
    onError: (err) => toast.error(err),
    onSuccess: () => {
      toast.success("Settings has been updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { isUpdaing, mutate };
}

export default useUpdateSettings;
