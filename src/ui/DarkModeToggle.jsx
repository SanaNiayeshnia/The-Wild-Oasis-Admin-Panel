import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useGeneralContext } from "../contexts/GeneralContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useGeneralContext();
  return (
    <>
      {!isDarkMode ? (
        <HiOutlineMoon onClick={toggleDarkMode} />
      ) : (
        <HiOutlineSun onClick={toggleDarkMode} />
      )}
    </>
  );
}

export default DarkModeToggle;
