import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import { NavLink } from "react-router-dom";

const StyledUserAvatar = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  & img {
    width: 30px;
    height: 30px;
    border: 3px solid transparent;
    border-radius: 10rem;
  }
  & p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-Gray-900);
  }

  &.active img {
    border-color: var(--color-green-600);
  }
`;
function UserAvatar() {
  const { user } = useUser();
  return (
    <StyledUserAvatar to="./account">
      <img
        src={user?.user_metadata?.avatar || "/imgs/default-user.jpg"}
        alt="avatar"
      />
      <p>{user?.user_metadata?.fullName}</p>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
