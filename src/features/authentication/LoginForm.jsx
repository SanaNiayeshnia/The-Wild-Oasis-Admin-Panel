import styled from "styled-components";
import Logo from "../../ui/sidebar/Logo";
import Input from "../../ui/form/Input";
import Button from "../../ui/Button";
import { useState } from "react";
import useLogin from "./useLogin";
import Spinner from "../../ui/Spinner";

const StyledLoginForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;
const Form = styled.form`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem 1.5rem;
  min-width: 350px;
  box-shadow: 0px 0px 5px 0 #cbd5e1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const LoginFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  & label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-Gray-900);
  }
`;
const FormHead = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-Gray-800);
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, loginMutate } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !email) return null;
    loginMutate({ email, password });
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <Logo minwidth="140px" />
      <FormHead>Log in To Your Account</FormHead>
      <Form>
        <LoginFormField>
          <label htmlFor="userEmail">Email Address</label>
          <Input
            type="email"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </LoginFormField>
        <LoginFormField>
          <label htmlFor="userPass">Password</label>
          <Input
            type="password"
            id="userPass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </LoginFormField>
        <Button className="secondary" disabled={isPending}>
          {isPending && <Spinner type="secondary" />}
          Log in
        </Button>
      </Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
