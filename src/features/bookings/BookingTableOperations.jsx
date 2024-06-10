import styled from "styled-components";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
const StyledBookingTableOperations = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function BookingTableOperations() {
  return (
    <StyledBookingTableOperations>
      <Filter
        filterField="status"
        options={["All", "Unconfirmed", "Checked In", "Checked Out"]}
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

          {
            value: "startDate-asc",
            label: "Sort by start date (recent first)",
          },
          {
            value: "startDate-desc",
            label: "Sort by start date (latest first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
          { value: "totalPrice-desc", label: "Sort by amount (high first)" },
        ]}
      />
    </StyledBookingTableOperations>
  );
}

export default BookingTableOperations;
