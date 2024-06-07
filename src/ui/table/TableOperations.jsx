import styled from "styled-components";
import Filter from "../Filter";
import Sort from "../Sort";

const StyledTableOperations = styled.div`
  display: flex;
  gap: 0.5rem;
`;
function TableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        filterField="discount"
        options={["All", "No Discount", "With Discount"]}
      />
      <Sort
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </StyledTableOperations>
  );
}

export default TableOperations;
