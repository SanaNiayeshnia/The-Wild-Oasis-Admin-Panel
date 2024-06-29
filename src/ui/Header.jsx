import styled from "styled-components";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "../features/authentication/useLogout";
import Spinner from "./Spinner";
import UserAvatar from "./UserAvatar";

const StyledHeader = styled.header`
  padding: 1rem;
  border-bottom: 1px solid var(--color-Gray-100);
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 5px 0px 5px 0 #cbd5e1;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    transition: all 0.3s;
    color: var(--color-Gray-500);
  }
  & svg:hover {
    color: var(--color-green-500);
  }
  & a.active svg {
    color: var(--color-green-600);
  }
  & a {
    display: flex;
  }
`;

function Header() {
  const { isPendingLogout, logoutMutate } = useLogout();
  return (
    <StyledHeader>
      {isPendingLogout ? (
        <Spinner type="secondary" />
      ) : (
        <HiArrowRightOnRectangle onClick={logoutMutate} />
      )}

      <UserAvatar />
    </StyledHeader>
  );
}

export default Header;
