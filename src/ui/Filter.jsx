import styled from "styled-components";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
const StyledFilter = styled.div`
  display: flex;
  gap: 0.15rem;
  background-color: var(--color-Gray-0);
  color: var(--color-Gray-900);
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  border: 1px solid var(--color-Gray-200);
  & button {
    background-color: var(--color-Gray-0);
    color: var(--color-Gray-900);
    font-size: 0.8rem;
  }
  & button.active {
    background-color: var(--color-green-500);
    color: white;
    cursor: auto;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentFilter = searchParams.get(filterField) || options[0].value;

  return (
    <StyledFilter>
      {options.map((opt, i) => (
        <Button
          key={i}
          className={currentFilter === opt.value && "active"}
          onClick={() => {
            searchParams.set(filterField, opt.value);
            searchParams.set("page", 1);
            setSearchParams(searchParams);
          }}
        >
          {opt.title}
        </Button>
      ))}
    </StyledFilter>
  );
}

export default Filter;
