import { createContext, useContext, useState } from "react";
const GeneralContext = createContext();
function GeneralContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<div>modal content</div>);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const mode = localStorage.getItem("mode");
    return mode === "dark";
  });

  function handleShowModal(content) {
    setModalContent(content);
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }
  return (
    <GeneralContext.Provider
      value={{
        showModal,
        handleShowModal,
        handleCloseModal,
        modalContent,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

function useGeneralContext() {
  const state = useContext(GeneralContext);
  return state;
}

export default GeneralContextProvider;
export { useGeneralContext };
