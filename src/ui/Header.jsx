import styled from "styled-components";
import {
  HiArrowLeftEndOnRectangle,
  HiArrowRightEndOnRectangle,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import useLogout from "../features/authentication/useLogout";
import Spinner from "./Spinner";
const StyledHeader = styled.header`
  padding: 1rem;
  border-bottom: 2px solid var(--color-Gray-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  & svg:hover {
    color: var(--color-green-500);
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
    </StyledHeader>
  );
}

export default Header;
