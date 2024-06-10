import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
function Login() {
  useEffect(() => {
    document.title = `${APP_NAME} - Login`;
  }, []);

  return <div>Login</div>;
}

export default Login;
