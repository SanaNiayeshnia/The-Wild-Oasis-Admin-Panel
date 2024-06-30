import styled from "styled-components";
const StyledButton = styled.button`
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: none;
  cursor: pointer;
  color: var(--color-Gray-800);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background-color: var(--color-Gray-0);
  gap: 0.25rem;
  &.primary {
    background-color: var(--color-Gray-100);
  }
  &.primary:hover {
    background-color: var(--color-Gray-200);
    color: var(--color-Gray-900);
  }
  &.secondary {
    color: white;
    background-color: var(--color-green-500);
  }
  &.secondary:hover {
    background-color: var(--color-green-600);
  }
  &.tertiary {
    padding: 0.25rem 0.5rem;
    border: 2px solid var(--color-red-500);
    background-color: var(--color-Gray-0);
    color: var(--color-red-500);
  }
  &.tertiary:hover {
    color: var(--color-Gray-0);
    background-color: var(--color-red-500);
  }
  &.quaternary {
    padding: 0.25rem 0.5rem;
    color: var(--color-blue-500);
    background-color: var(--color-Gray-0);
    border: 2px solid var(--color-blue-500);
  }
  &.quaternary:hover {
    color: var(--color-Gray-0);
    background-color: var(--color-blue-500);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

function Button({ className, type, onClick, disabled, children }) {
  return (
    <StyledButton
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
