import styled from "styled-components";

const StyledDashboard = styled.div`
  padding: 1rem;
  grid-row: span 3;
  border-top: 2px solid var(--color-Gray-100);
  height: 100%;
`;
function Dashboard() {
  return <StyledDashboard>Dashboard</StyledDashboard>;
}

export default Dashboard;
