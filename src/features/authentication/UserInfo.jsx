import styled from "styled-components";
import useUser from "./useUser";
import Spinner from "../../ui/Spinner";
const StyledUserInfo = styled.div`
  background-color: white;
  box-shadow: 0px 0px 5px 0 #cbd5e1;
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  & img {
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
    border-radius: 10rem;
    margin-top: -10%;
    box-shadow: 0px 0px 2px 0 #cbd5e1;
    border: 5px solid white;
    outline: 3px solid var(--color-green-500);
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--color-Gray-900);
  & p:first-child {
    font-weight: 600;
  }
  & p {
    margin: 0;
  }
`;

function UserInfo() {
  const { isLoading, user } = useUser();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <StyledUserInfo>
          <img
            src={
              user?.user_metadata?.avatar ||
              "../../../public/imgs/default-user.jpg"
            }
            alt="avatar"
          />
          <Info>
            <p>Full name</p>
            <p>{user?.user_metadata?.fullName}</p>
          </Info>
          <Info>
            <p>Email</p>
            <p>{user?.email}</p>
          </Info>
        </StyledUserInfo>
      )}
    </>
  );
}

export default UserInfo;
