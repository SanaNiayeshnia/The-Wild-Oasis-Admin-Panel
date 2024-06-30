import { createContext, useContext, useRef, useState } from "react";
const GeneralContext = createContext();
function GeneralContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<div>modal content</div>);
  const mainRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleShowModal(content) {
    mainRef.current.scrollTop = "0";
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
        mainRef,
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
