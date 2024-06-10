import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
function Users() {
  useEffect(() => {
    document.title = `${APP_NAME} - Users`;
  }, []);

  return <div>Users</div>;
}

export default Users;
