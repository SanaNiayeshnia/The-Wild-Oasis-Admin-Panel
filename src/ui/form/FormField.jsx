import styled from "styled-components";
import propTypes from "prop-types";
const StyledFormField = styled.div`
  padding: 1rem;
  margin: auto 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  color: var(--color-Gray-900);
  gap: 0.5rem;
  &:not(.last) {
    border-bottom: 2px solid var(--color-Gray-100);
  }
  & select {
    border-radius: 0.25rem;
    border: 2px solid var(--color-Gray-200);
    outline: none;
    padding: 0.25rem 0.5rem;
  }
`;

FormField.propTypes = {
  children: propTypes.any,
  label: propTypes.string,
  className: propTypes.string,
};

function FormField({ children, label, className }) {
  return (
    <StyledFormField className={className}>
      <label htmlFor={children[0]?.props?.id}>{label}</label>
      {children}
    </StyledFormField>
  );
}

export default FormField;
