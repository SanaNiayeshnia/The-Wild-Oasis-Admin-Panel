import { useForm } from "react-hook-form";
import Form from "../../ui/form/Form";
import FormField from "../../ui/form/FormField";
import FormHead from "../../ui/form/FormHead";
import Input from "../../ui/form/Input";
import Error from "../../ui/Error";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useGeneralContext } from "../../contexts/GeneralContext";
import useCreateGuest from "./useCreateGuest";
import Spinner from "../../ui/Spinner";
import useUpdateGuest from "./useUpdateGuest";
import toast from "react-hot-toast";
import useCountries from "./useCountries";

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;

function GuestForm({ guestToEdit = {} }) {
  const { id: editId, ...restEditValues } = guestToEdit;
  const isEditSession = Boolean(editId);
  const { handleCloseModal } = useGeneralContext();
  const { register, formState, handleSubmit } = useForm({
    defaultValues: isEditSession ? restEditValues : {},
  });
  const { errors } = formState;
  const { isPending: isPendingCreate, mutate: craeteGuestMutate } =
    useCreateGuest();
  const { isPending: isPendingUpdate, mutate: updateGuestMutate } =
    useUpdateGuest();
  const { countries } = useCountries();
  console.log(countries?.map((c) => c?.name));

  function onSubmit(guest) {
    if (isEditSession) updateGuestMutate({ editId, guest });
    else craeteGuestMutate(guest);
  }
  function onError() {
    toast("Fill the form correctly and try again!", { icon: "✍️" });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormHead>Add New Guest</FormHead>
      <FormField label="Full Name">
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field can't be empty!" })}
        />
        <Error>{errors?.fullName?.message}</Error>
      </FormField>
      <FormField label="Email">
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "This field can't be empty!",
            validate: (email) => {
              return (
                String(email)
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  ) || "This isn't a valid email address!"
              );
            },
          })}
        />
        <Error>{errors?.email?.message}</Error>
      </FormField>
      <FormField label="Nationality">
        <select
          id="nationality"
          {...register("nationality")}
          style={{ maxWidth: "180px" }}
        >
          {countries?.map((country, index) => (
            <option key={index} value={country?.name}>
              {country?.name}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="National ID" className="last">
        <Input
          type="text"
          id="nationalID"
          {...register("nationalID", {
            required: "This field can't be empty!",
          })}
        />
        <Error>{errors?.nationalID?.message}</Error>
      </FormField>
      <Div>
        <Button
          className="primary"
          type="reset"
          onClick={handleCloseModal}
          disabled={isPendingCreate || isPendingUpdate}
        >
          Cancel
        </Button>
        <Button
          className="secondary"
          type="submit"
          disabled={isPendingCreate || isPendingUpdate}
        >
          {(isPendingCreate || isPendingUpdate) && <Spinner type="secondary" />}
          {isEditSession ? "Update Guest" : "Add Guest"}
        </Button>
      </Div>
    </Form>
  );
}

export default GuestForm;
