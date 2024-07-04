import { HiSearch } from "react-icons/hi";
import styled from "styled-components";
import { useGeneralContext } from "../contexts/GeneralContext";
import SearchForm from "./SearchForm";

const StyledSearchButton = styled.div`
  display: grid;
  place-items: center;
  background-color: var(--color-Gray-0);
  color: var(--color-Gray-900);
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  padding: 0.75rem 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-Gray-100);
  }
  &:hover svg {
    transform: scale(1.1);
  }
`;
function SearchButton({ searchFor }) {
  const { handleShowModal } = useGeneralContext();
  return (
    <StyledSearchButton
      onClick={() => {
        handleShowModal(
          <SearchForm key={Math.random()} searchFor={searchFor} />
        );
      }}
    >
      <HiSearch />
    </StyledSearchButton>
  );
}

export default SearchButton;
