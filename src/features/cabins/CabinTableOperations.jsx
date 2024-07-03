import styled from "styled-components";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import SearchButton from "../../ui/SearchButton";

const StyledTableOperations = styled.div`
  display: flex;
  gap: 0.5rem;
`;
function CabinTableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        filterField="discount"
        options={[
          { title: "All", value: "all" },
          { title: "No Discount", value: "no-discount" },
          { title: "With Discount", value: "with-discount" },
        ]}
      />
      <Sort
        options={[
          {
            value: "created_at-desc",
            label: "Sort by creating date (recent first)",
          },
          {
            value: "created_at-asc",
            label: "Sort by creating date (oldest first)",
          },

          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
      <SearchButton searchFor="cabin name" />
    </StyledTableOperations>
  );
}

export default CabinTableOperations;
