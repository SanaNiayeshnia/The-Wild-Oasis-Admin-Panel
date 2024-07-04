import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBooking(setShowContext) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: deleteBooking,
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking ${data.id} has been deleted successfully!`);
      setShowContext && setShowContext(false);
      navigate("/bookings");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({
        queryKey: [`today-activity`],
      });
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { isPending, mutate };
}

export default useDeleteBooking;
