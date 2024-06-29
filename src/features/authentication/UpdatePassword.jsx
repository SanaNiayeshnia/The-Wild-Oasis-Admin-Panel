import styled from "styled-components";
import Button from "../../ui/Button";
import Error from "../../ui/Error";
import Form from "../../ui/form/Form";
import FormField from "../../ui/form/FormField";
import FormHead from "../../ui/form/FormHead";
import Input from "../../ui/form/Input";
import { useForm, useWatch } from "react-hook-form";
import { useGeneralContext } from "../../contexts/GeneralContext";
import useUpdateUser from "./useUpdateUser";
import Spinner from "../../ui/Spinner";

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;

function UpdatePassword() {
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;
  const watchedValues = useWatch({ control });
  const { handleCloseModal } = useGeneralContext();
  const { isPending, mutate: UpdatePaswordMutate } = useUpdateUser();
  function onSubmit(data) {
    UpdatePaswordMutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHead>Change Password</FormHead>

      <FormField label="New password">
        <Input
          type="password"
          id="newPassword"
          autoFocus
          {...register("password", {
            required: "This field can't be empty!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters!",
            },
          })}
        />
        <Error>{errors?.password?.message}</Error>
      </FormField>
      <FormField label="Confirm password" className="last">
        <Input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "This field can't be empty!",
            validate: (value) =>
              value === watchedValues.password || "Passwords need to match!",
          })}
        />
        <Error>{errors?.confirmPassword?.message}</Error>
      </FormField>

      <Div>
        <Button className="primary" type="reset" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button className="secondary">
          {isPending && <Spinner type="secondary" />}
          Update password
        </Button>
      </Div>
    </Form>
  );
}

export default UpdatePassword;
