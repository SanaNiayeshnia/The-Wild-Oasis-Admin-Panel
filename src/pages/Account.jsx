import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";

function Account() {
  useEffect(() => {
    document.title = `${APP_NAME} - Acount`;
  }, []);

  return <div>Account</div>;
}

export default Account;
