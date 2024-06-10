import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
function PageNotFound() {
  useEffect(() => {
    document.title = `${APP_NAME} - 404`;
  }, []);

  return <div>Page Not Found !</div>;
}

export default PageNotFound;
