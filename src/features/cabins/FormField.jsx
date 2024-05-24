import styled from "styled-components";

const StyledFormField = styled.div`
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

const Textarea = styled.textarea`
  border-radius: 0.25rem;
  border: 2px solid var(--color-Gray-200);
  outline: none;
  padding: 0.25rem 0.5rem;
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

function FormField({ children, label, className }) {
  return (
    <StyledFormField className={className}>
      <label htmlFor={children[0]?.props?.id}>{label}</label>
      {children}
    </StyledFormField>
  );
}

export default FormField;
export { Input, FileInput, Textarea };
