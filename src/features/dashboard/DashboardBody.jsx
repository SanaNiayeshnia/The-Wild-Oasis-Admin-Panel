import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Statistics from "./Statistics";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";

const StyledDashboardBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;

function DashboardBody() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins, count } = useCabins(true);

  return (
    <>
      {isLoadingBookings || isLoadingStays || isLoadingCabins ? (
        <Spinner type="primary" />
      ) : (
        <StyledDashboardBody>
          <Statistics
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
            cabinsCount={count}
          />
        </StyledDashboardBody>
      )}
    </>
  );
}

export default DashboardBody;
