import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import Logo from "./Logo";
import DesignedBy from "./DesignedBy";
import SideList from "./SideList";
import StyledNavLink from "./StyledNavLink";

const StyledSideBar = styled.aside`
  grid-row: 1/-1;
  padding: 1rem;
  border-right: 2px solid var(--color-Gray-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Div = styled.div`
  min-width: 85%;
  text-align: center;
`;

function SideBar() {
  return (
    <StyledSideBar>
      <Div>
        <Logo src="./imgs/logo-light.png" alt="The wild Oasis Logo" />
        <SideList>
          <li>
            <StyledNavLink to="/dashboard">
              <HiOutlineHome />
              Home
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/bookings">
              <HiOutlineCalendarDays />
              Bookings
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="cabins">
              <HiOutlineHomeModern />
              Cabins
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="users">
              <HiOutlineUsers />
              Users
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/settings">
              <HiOutlineCog6Tooth />
              Settings
            </StyledNavLink>
          </li>
        </SideList>
      </Div>

      <DesignedBy>developed by sana</DesignedBy>
    </StyledSideBar>
  );
}

export default SideBar;
