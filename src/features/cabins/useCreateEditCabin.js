import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useGeneralContext } from "../../contexts/GeneralContext";
import { useSearchParams } from "react-router-dom";

function useCreateEditCabin(setOpenContextId, isEditSession = false) {
  const { showModal, handleCloseModal } = useGeneralContext();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isPending, mutate } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: createEditCabin,
    onError: (err) => {
      toast.error(err.message);
      setOpenContextId && setOpenContextId(null);
    },
    onSuccess: (data) => {
      toast.success(
        isEditSession
          ? `Cabin ${data.name} has been updated successfully!`
          : `New Cabin has been created successfully!`
      );
      setOpenContextId && setOpenContextId(null);
      if (!isEditSession) {
        setSearchParams({});
      }
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      queryClient.invalidateQueries(`cabin/${data.id}`);
      showModal && handleCloseModal();
    },
  });
  return { isPending, mutate };
}

export default useCreateEditCabin;
