import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Statistics from "./Statistics";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import Charts from "./Charts";

const StyledDashboardBody = styled.div``;

function DashboardBody() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isLoading: isLoadingCabins, count } = useCabins(true);

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
          <Charts bookings={bookings} stays={stays} numDays={numDays} />
        </StyledDashboardBody>
      )}
    </>
  );
}

export default DashboardBody;
