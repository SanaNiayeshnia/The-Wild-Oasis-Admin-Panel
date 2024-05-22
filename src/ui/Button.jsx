import styled from "styled-components";
const Button = styled.button`
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  cursor: pointer;
  background-color: var(--color-Gray-100);
  color: var(--color-Gray-800);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-Gray-200);
    color: var(--color-Gray-900);
  }
`;
export default Button;
