import styled from "styled-components";
import AreaChartComponent from "./AreaChartComponent";
import PieChartComponent from "./PieChartComponent";
import TodaysActivity from "./TodaysActivity";
const StyledCharts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
`;
function Charts({ bookings, numDays, stays }) {
  return (
    <StyledCharts>
      <TodaysActivity />
      <PieChartComponent stays={stays} />
      <AreaChartComponent bookings={bookings} numDays={numDays} />
    </StyledCharts>
  );
}

export default Charts;
