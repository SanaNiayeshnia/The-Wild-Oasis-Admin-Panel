import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useUpdateBooking(id, setOpenContextId) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: updateBooking,
    onError: (err) => {
      setOpenContextId && setOpenContextId(null);
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(`Booking ${id} has been updated.`);
      setOpenContextId && setOpenContextId(null);
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
