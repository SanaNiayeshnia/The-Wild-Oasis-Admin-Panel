import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSort = styled.select`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  background-color: var(--color-Gray-0);
  color: var(--color-Gray-900);
  border: 1px solid var(--color-Gray-200);
  padding: 0.25rem;
  &:focus {
    outline: none;
  }
  & option {
    transition: all 0.3s;
    cursor: pointer;
    font-size: 0.8rem;
  }
  & option:hover {
    background-color: var(--color-green-500);
  }
`;
function Sort({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <StyledSort
      onChange={(e) => {
        searchParams.set("sortby", e.target.value);
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }}
      value={searchParams.get("sortby") || ""}
    >
      {options.map((opt, i) => (
        <option value={opt.value} key={i}>
          {opt.label}
        </option>
      ))}
    </StyledSort>
  );
}

export default Sort;
