import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: var(--color-Gray-0);
  & div {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    gap: 1rem;
    & p,
    & h2 {
      color: var(--color-Gray-900);
      margin: 0;
    }
    & button {
      margin-top: 1rem;
    }
  }
`;
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <div>
          <h2>Something went wrong! 🤔</h2>
          <p>{error.message}</p>
          <Button className="secondary" onClick={resetErrorBoundary}>
            Go Back
          </Button>
        </div>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
