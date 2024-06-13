import styled from "styled-components";

const StyledSelectBox = styled.select`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 #cbd5e1;
  border: none;
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
