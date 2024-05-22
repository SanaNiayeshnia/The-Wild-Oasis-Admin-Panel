import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SideBar from "./sidebar/SideBar";
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 18rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-Gray-50);
  overflow: auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
