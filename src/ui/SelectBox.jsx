import styled from "styled-components";

const StyledSelectBox = styled.select`
  background-color: var(--color-Gray-0);
  color: var(--color-Gray-900);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  border: 1px solid var(--color-Gray-200);
  padding: 0.25rem;
  &:focus {
    outline: none;
  }
  & option {
    cursor: pointer;
  }
`;

function SelectBox({ onChange, children }) {
  return <StyledSelectBox onChange={onChange}>{children}</StyledSelectBox>;
}

export default SelectBox;
