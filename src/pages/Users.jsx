import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
import SignupForm from "../features/authentication/SignupForm";
import Button from "../ui/Button";
import { useGeneralContext } from "../contexts/GeneralContext";
function Users() {
  const { handleShowModal } = useGeneralContext();
  useEffect(() => {
    document.title = `${APP_NAME} - Users`;
  }, []);

  function handleOpenAddUserForm() {
    handleShowModal(<SignupForm />);
  }
  return (
    <div>
      <Button className="secondary" onClick={handleOpenAddUserForm}>
        Add New User
      </Button>
    </div>
  );
}

export default Users;
