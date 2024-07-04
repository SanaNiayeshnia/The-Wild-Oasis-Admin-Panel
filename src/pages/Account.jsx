import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
import styled from "styled-components";
import UpdateUserInfoForm from "../features/authentication/UpdateUserInfoForm";
import UpdatePassword from "../features/authentication/UpdatePassword";
import Button from "../ui/Button";
import { HiClipboardDocumentCheck, HiKey } from "react-icons/hi2";
import { useGeneralContext } from "../contexts/GeneralContext";
import UserInfo from "../features/authentication/UserInfo";
const StyledAccount = styled.div`
  padding: 0 1rem;
  max-width: 70rem;
  max-height: min-content;
  margin: auto;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 9fr;
  align-items: center;
`;
const AccountHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & p {
    color: var(--color-Gray-800);
    font-weight: 600;

    padding: 0 1.5rem;
  }
  & p:first-child {
    font-size: 1.5rem;
  }
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const StyledButton = styled(Button)`
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  &:hover {
    color: var(--color-green-600);
  }
`;

function Account() {
  const { handleShowModal } = useGeneralContext();
  useEffect(() => {
    document.title = `${APP_NAME} - Account`;
  }, []);

  function handleShowUpdateUserForm() {
    handleShowModal(<UpdateUserInfoForm key={Math.random()} />);
  }
  function handleShowChangePasswordForm() {
    handleShowModal(<UpdatePassword key={Math.random()} />);
  }

  return (
    <StyledAccount>
      <AccountHead>
        <p>Account Center</p>
        <Div>
          <StyledButton onClick={handleShowUpdateUserForm}>
            <HiClipboardDocumentCheck />
            Update User Info
          </StyledButton>
          <StyledButton onClick={handleShowChangePasswordForm}>
            <HiKey />
            Change Password
          </StyledButton>
        </Div>
      </AccountHead>
      <UserInfo />
    </StyledAccount>
  );
}

export default Account;
