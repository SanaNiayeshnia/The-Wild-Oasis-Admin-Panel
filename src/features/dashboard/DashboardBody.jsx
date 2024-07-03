import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Statistics from "./Statistics";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import Charts from "./Charts";
import useTodaysBookings from "./useTodaysBookings";

const StyledDashboardBody = styled.div``;

function DashboardBody() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isLoading: isLoadingCabins, count: cabinCount } = useCabins(true);
  const {
    todaysBookings,
    isLoading: isLoadingTodaysBookings,
    count: tBookingCount,
  } = useTodaysBookings();

  return (
    <>
      {isLoadingBookings ||
      isLoadingStays ||
      isLoadingCabins ||
      isLoadingTodaysBookings ? (
        <Spinner type="primary" />
      ) : (
        <StyledDashboardBody>
          <Statistics
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
            cabinsCount={cabinCount}
          />
          <Charts
            bookings={bookings}
            stays={stays}
            numDays={numDays}
            todaysBookings={todaysBookings}
            todaysBookingsCount={tBookingCount}
          />
        </StyledDashboardBody>
      )}
    </>
  );
}

export default DashboardBody;
