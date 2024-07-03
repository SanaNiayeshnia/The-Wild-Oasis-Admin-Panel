import styled from "styled-components";
import Sort from "../../ui/Sort";
import SearchButton from "../../ui/SearchButton";
const StyledGuestTableOperation = styled.div`
  display: flex;
  gap: 0.5rem;
  & select {
    padding: 0.75rem 1rem;
  }
`;
function GuestTableOperations() {
  return (
    <StyledGuestTableOperation>
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

          {
            value: "fullName-asc",
            label: "Sort by full name (A-Z)",
          },
          {
            value: "fullName-desc",
            label: "Sort by full name (Z-A)",
          },
        ]}
      />
      <SearchButton searchFor="guest's name" />
    </StyledGuestTableOperation>
  );
}

export default GuestTableOperations;
