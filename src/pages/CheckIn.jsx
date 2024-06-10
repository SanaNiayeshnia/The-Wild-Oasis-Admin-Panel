import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";

function CheckIn() {
  useEffect(() => {
    document.title = `${APP_NAME} - Check In`;
  }, []);

  return <div>Check in</div>;
}

export default CheckIn;
