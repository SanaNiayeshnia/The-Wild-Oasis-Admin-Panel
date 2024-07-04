import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SideBar from "./sidebar/SideBar";
import { useGeneralContext } from "../contexts/GeneralContext";
import Modal from "./Modal";
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 0.23fr 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-Gray-50);
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    appearance: none;
    width: 0.5rem;
    background-color: var(--color-Gray-300);
    transition: all 0.3s;
  }
  &::-webkit-scrollbar-thumb {
    width: 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--color-Gray-400);
    transition: all 0.3s;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-green-500);
  }
  &.modal-open {
    overflow: hidden;
  }
`;

function AppLayout() {
  const { showModal, mainRef } = useGeneralContext();

  return (
    <StyledAppLayout>
      <SideBar />
      <Header />
      <Main className={showModal && "modal-open"} ref={mainRef}>
        <Modal className={`no-padding ${showModal && "show"}`} />
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
