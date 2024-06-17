import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

const StyledLogin = styled.div`
  position: relative;
  height: 100vh;
  background-color: var(--color-Gray-50);
`;

function Login() {
  useEffect(() => {
    document.title = `${APP_NAME} - Login`;
  }, []);

  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
