import styled from "styled-components";
import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
import DashboardOperation from "../features/dashboard/DashboardOperation";
import DashboardBody from "../features/dashboard/DashboardBody";

const StyledDashboard = styled.div`
  padding: 0 1rem;
  max-width: 65rem;
  max-height: min-content;
  margin: auto;
`;
const DashboardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 1.5rem;
  margin: auto;
  & p {
    color: var(--color-Gray-800);
    font-weight: 600;
  }
  &:first-child {
    font-size: 1.5rem;
  }
`;

function Dashboard() {
  useEffect(() => {
    document.title = `${APP_NAME} - Dashboard`;
  }, []);

  return (
    <StyledDashboard>
      <DashboardHead>
        <p>Dashboard</p>
        <DashboardOperation />
      </DashboardHead>
      <DashboardBody />
    </StyledDashboard>
  );
}

export default Dashboard;
