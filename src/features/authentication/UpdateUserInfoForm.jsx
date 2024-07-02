import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import Form from "../../ui/form/Form";
import FormField from "../../ui/form/FormField";
import Input from "../../ui/form/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import FormHead from "../../ui/form/FormHead";
import { useGeneralContext } from "../../contexts/GeneralContext";
import useUpdateUser from "./useUpdateUser";
import useUser from "./useUser";
import FileInput from "../../ui/form/FileInput";

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;

function UpdateUserInfoForm() {
  const { user } = useUser();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: user?.email,
      fullName: user?.user_metadata?.fullName,
      avatar: user?.user_metadata?.avatar,
    },
  });
  const { errors } = formState;
  const { handleCloseModal } = useGeneralContext();
  const { isPending, mutate: updateUserMutate } = useUpdateUser();
  function onSubmit(data) {
    updateUserMutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHead>Update user data</FormHead>

      <FormField label="Email address">
        <Input
          type="text"
          id="email"
          disabled={true}
          {...register("email", { required: "This field can't be empty!" })}
        />
        <Error>{errors?.email?.message}</Error>
      </FormField>
      <FormField label="Full name">
        <Input
          type="text"
          id="fullName"
          autoFocus
          {...register("fullName", {
            required: "This field can't be empty!",
          })}
        />
        <Error>{errors?.fullName?.message}</Error>
      </FormField>
      <FormField label="Avatar image" className="last">
        <FileInput
          type="file"
          accept="image/*"
          id="avatar"
          {...register("avatar", { required: false })}
        />
        <Error>{errors?.avatar?.message}</Error>
      </FormField>
      <Div>
        <Button className="primary" type="reset" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button className="secondary">
          {isPending && <Spinner type="secondary" />}
          Update account
        </Button>
      </Div>
    </Form>
  );
}

export default UpdateUserInfoForm;
