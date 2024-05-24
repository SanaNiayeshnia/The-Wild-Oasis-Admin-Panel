import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import FormField, { Input, FileInput, Textarea } from "./FormField";
import Error from "../../ui/Error";

const Form = styled.form`
  margin: 1.5rem auto;
  background-color: white;
  box-shadow: 0px 0px 8px 0 #cbd5e1;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const FormHead = styled.p`
  background-color: var(--color-green-600);
  padding: 0.75rem;
  font-weight: 500;
  color: white;
  width: 100%;
  margin: 0;
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;

function CabinForm({ setIsFormOpen, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: createEditCabin,
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success(
        isEditSession
          ? `Cabin ${data.name} has been updated successfully!`
          : `Cabin ${data.name} has been added successfully!`
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setIsFormOpen(false);
    },
  });

  function onSubmit(cabinData) {
    mutate({ cabinData, editId });
  }
  function onError() {
    toast("Fill the form correctly and try again!", { icon: "✍️" });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormHead>{isEditSession ? "Update Cabin" : "Add New Cabin"}</FormHead>
      <FormField label="Name">
        <Input
          type="text"
          id="name"
          autoFocus
          {...register("name", { required: "This field can't be empty!" })}
        />
        <Error>{errors?.name?.message}</Error>
      </FormField>

      <FormField label="Maximum Capacity">
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field can't be empty!",
            min: {
              value: 1,
              message: "Maximum capacity must be greater than 1!",
            },
          })}
        />
        <Error>{errors?.maxCapacity?.message}</Error>
      </FormField>

      <FormField label="Regular Price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field can't be empty!",
            min: {
              value: 1,
              message: "Regular Price must be greater than 1$!",
            },
          })}
        />
        <Error>{errors?.regularPrice?.message}</Error>
      </FormField>

      <FormField label="Discount">
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field can't be empty!",
            min: {
              value: 0,
              message: "Discount can't be a negative number!",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than or euqual to Regular Price!",
          })}
        />
        <Error>{errors?.discount?.message}</Error>
      </FormField>

      <FormField label="Cabin Image">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "You must choose a photo!",
          })}
        />
      </FormField>

      <FormField className="last" label="Description">
        <Textarea
          rows={4}
          id="description"
          {...register("description", {
            required: "This field can't be empty!",
          })}
        ></Textarea>
        <Error>{errors?.description?.message}</Error>
      </FormField>

      <Div>
        <Button
          className="primary"
          type="reset"
          onClick={() => setIsFormOpen(false)}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button className="secondary" disabled={isPending}>
          {isPending && <Spinner type="secondary" />}
          {!isEditSession ? (
            <span>{isPending ? "Adding" : "Add Cabin"}</span>
          ) : (
            <span>{isPending ? "Updating" : "Update Cabin"}</span>
          )}
        </Button>
      </Div>
    </Form>
  );
}

export default CabinForm;
