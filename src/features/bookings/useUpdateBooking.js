import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useGeneralContext } from "../../contexts/GeneralContext";

function useUpdateBooking(id, setOpenContextId) {
  const { showModal, handleCloseModal } = useGeneralContext();
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
      showModal && handleCloseModal();
      queryClient.invalidateQueries({
        queryKey: [`booking/${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`bookings`],
      });
      queryClient.invalidateQueries({
        queryKey: [`booking/${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`today-activity`],
      });
    },
  });
  return { isPending, mutate };
}

export default useUpdateBooking;
