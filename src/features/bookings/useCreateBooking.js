import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking } from "../../services/apiBookings";
import { useGeneralContext } from "../../contexts/GeneralContext";

function useCreateBooking() {
  const { showModal, handleCloseModal } = useGeneralContext();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: createBooking,
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success(`Booking ${data?.id} has been created successfully!`);
      queryClient.invalidateQueries("bookings");
      queryClient.invalidateQueries({
        queryKey: [`today-activity`],
      });
      queryClient.invalidateQueries({ active: true });

      showModal && handleCloseModal();
    },
  });
  return { mutate, isPending };
}

export default useCreateBooking;
