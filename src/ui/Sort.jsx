import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSort = styled.select`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 #cbd5e1;
  border: none;
  padding: 0.25rem;
  &:focus {
    outline: none;
  }
  & option {
    transition: all 0.3s;
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
