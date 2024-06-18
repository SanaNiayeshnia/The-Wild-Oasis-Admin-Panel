import { useForm, useWatch } from "react-hook-form";
import Error from "../../ui/Error";
import Form from "../../ui/form/Form";
import FormField from "../../ui/form/FormField";
import FormHead from "../../ui/form/FormHead";
import Input from "../../ui/form/Input";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGeneralContext } from "../../contexts/GeneralContext";
import useSignup from "./useSignup";
import Spinner from "../../ui/Spinner";

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem;
`;

function SignupForm() {
  const { register, formState, handleSubmit, control, reset } = useForm();
  const watchedValues = useWatch({ control });
  const { errors } = formState;
  const { handleCloseModal } = useGeneralContext();
  const { isPending, signupMutate } = useSignup();

  function onSubmit(data) {
    signupMutate({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHead>Create a new user</FormHead>
      <FormField label="Full name">
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          autoFocus
          {...register("fullName", { required: "This field can't be empty!" })}
        />
        <Error>{errors?.fullName?.message}</Error>
      </FormField>
      <FormField label="Email address">
        <Input
          type="text"
          id="email"
          disabled={isPending}
          autoFocus
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
      <FormField label="Password (min 6 char)">
        <Input
          type="password"
          id="password"
          disabled={isPending}
          autoFocus
          {...register("password", { required: "This field can't be empty!" })}
        />
        <Error>{errors?.password?.message}</Error>
      </FormField>
      <FormField label="Repeat password" className="last">
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          autoFocus
          {...register("passwordConfirm", {
            required: "This field can't be empty!",
            validate: (value) =>
              value === watchedValues.password || "Passwords need to match!",
          })}
        />
        <Error>{errors?.passwordConfirm?.message}</Error>
      </FormField>

      <Div>
        <Button
          className="primary"
          type="reset"
          onClick={handleCloseModal}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button className="secondary" disabled={isPending}>
          {isPending && <Spinner type="secondary" />}
          Create New User
        </Button>
      </Div>
    </Form>
  );
}

export default SignupForm;
