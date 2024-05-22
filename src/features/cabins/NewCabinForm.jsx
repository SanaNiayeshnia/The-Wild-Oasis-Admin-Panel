import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import propTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";

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
const FormField = styled.div`
  padding: 1rem;
  margin: auto 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 0.5rem;
  &:not(.last) {
    border-bottom: 2px solid var(--color-Gray-100);
  }
`;
const Input = styled.input`
  border-radius: 0.25rem;
  border: 2px solid var(--color-Gray-200);
  outline: none;
  padding: 0.25rem 0.5rem;
`;
const FileInput = styled.input.attrs({ type: "file" })`
  &::file-selector-button {
    background-color: var(--color-Gray-100);
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
  }
  &::file-selector-button:hover {
    background-color: var(--color-Gray-200);
  }
`;
const Textarea = styled.textarea`
  border-radius: 0.25rem;
  border: 2px solid var(--color-Gray-200);
  outline: none;
  padding: 0.25rem 0.5rem;
`;
const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;
const AddCabinBtn = styled(Button)`
  background-color: var(--color-green-500);
  color: white;
  padding: 0.5rem 0.75rem;
  &:hover {
    background-color: var(--color-green-600);
    color: white;
  }
`;
const CancelBtn = styled(Button)`
  padding: 0.5rem 0.75rem;
`;
const Error = styled.p`
  color: var(--color-red-700);
  margin: 0;
  text-align: center;
  font-size: 0.85rem;
`;

function NewCabinForm({ setIsAddNewCabinFormOpen }) {
  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isPending: isAdding, mutate } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: addNewCabin,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("The cabin has been added successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setIsAddNewCabinFormOpen(false);
      reset();
    },
  });

  function onSubmit(newCabinData) {
    console.log(newCabinData);
    mutate(newCabinData);
  }
  function onError() {
    toast("Fill the form correctly and try again!", { icon: "✍️" });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormHead>Add New Cabin</FormHead>
      <FormField>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field can't be empty!" })}
        />
        <Error>{errors?.name?.message}</Error>
      </FormField>
      <FormField>
        <label htmlFor="maxCapacity">Maximum Capacity</label>
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
      <FormField>
        <label htmlFor="regularPrice">Regular Price</label>
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
      <FormField>
        <label htmlFor="discount">Discount</label>
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
      <FormField>
        <label htmlFor="image">Cabin Image</label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "You must choose a photo!" })}
        />
      </FormField>
      <FormField className="last">
        <label htmlFor="description">Description</label>
        <Textarea
          rows={4}
          {...register("description", {
            required: "This field can't be empty!",
          })}
        ></Textarea>
        <Error>{errors?.description?.message}</Error>
      </FormField>
      <Div>
        <CancelBtn type="reset" onClick={() => setIsAddNewCabinFormOpen(false)}>
          Cancel
        </CancelBtn>
        <AddCabinBtn disabled={isAdding}>
          {isAdding && <Spinner type="secondary" />}
          <span>Add Cabin</span>
        </AddCabinBtn>
      </Div>
    </Form>
  );
}

export default NewCabinForm;
