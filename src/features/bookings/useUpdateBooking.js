import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useUpdateBooking(id, setShowContext) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: updateBooking,
    onError: (err) => {
      setShowContext && setShowContext(false);
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(`Booking ${id} has been updated.`);
      setShowContext && setShowContext(false);
      queryClient.invalidateQueries({
        queryKey: [`booking/${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`bookings`],
      });
    },
  });
  return { isPending, mutate };
}

export default useUpdateBooking;
