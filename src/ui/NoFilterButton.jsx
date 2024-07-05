import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledNoButtonFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background-color: var(--color-Gray-0);
  color: var(--color-Gray-900);
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  padding: 0.75rem;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    background-color: var(--color-Gray-100);
  }
  & svg {
    color: var(--color-green-600);
    width: 1rem;
    height: 1rem;
  }
`;
function NoFilterButton() {
  const [searchParams, setSearchParams] = useSearchParams();
  function removeAllFilters() {
    setSearchParams({});
  }
  return (
    <StyledNoButtonFilter onClick={removeAllFilters}>
      No filter
      <IoClose />
    </StyledNoButtonFilter>
  );
}

export default NoFilterButton;
