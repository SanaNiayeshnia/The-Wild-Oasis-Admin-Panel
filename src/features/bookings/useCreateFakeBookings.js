import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCreateFakeBookings() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: createBookings,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Fake booking data has been created successfully!");
      queryClient.invalidateQueries("bookings");
      queryClient.invalidateQueries("today-activity");
      queryClient.invalidateQueries();
    },
  });
  return { isPending, mutate };
}

export default useCreateFakeBookings;
