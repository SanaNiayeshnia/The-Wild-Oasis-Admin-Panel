import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import FormField from "../../ui/form/FormField";
import Input from "../../ui/form/Input";
import Textarea from "../../ui/form/Textarea";
import FileInput from "../../ui/form/FileInput";
import FormHead from "../../ui/form/FormHead";
import Error from "../../ui/Error";
import useCreateEditCabin from "./useCreateEditCabin";
import propTypes from "prop-types";
import Form from "../../ui/form/Form";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;

CabinForm.propTypes = {
  setIsFormOpen: propTypes.func,
  cabinToEdit: propTypes.object,
};

function CabinForm({ setIsFormOpen, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState, control } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const watchedValues = useWatch({ control });
  const { isPending, mutate } = useCreateEditCabin(
    isEditSession,
    setIsFormOpen
  );
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
              value <= watchedValues.regularPrice ||
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
        <Error>{errors?.image?.message}</Error>
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
