import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useGeneralContext } from "../contexts/GeneralContext";
import { useEffect } from "react";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useGeneralContext();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);
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
