import styled from "styled-components";
const Input = styled.input`
  border-radius: 0.25rem;
  border: 2px solid var(--color-Gray-200);
  outline: none;
  padding: 0.25rem 0.5rem;
  &:disabled {
    background-color: var(--color-Gray-200);
    color: var(--color-Gray-500);
  }
`;

export default Input;
