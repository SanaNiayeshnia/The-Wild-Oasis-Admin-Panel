import { createContext, useContext, useRef, useState } from "react";
const GeneralContext = createContext();
function GeneralContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<div>modal content</div>);
  const mainRef = useRef();

  function handleShowModal(content) {
    mainRef.current.scrollTop = "0";
    setModalContent(content);
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <GeneralContext.Provider
      value={{
        showModal,
        handleShowModal,
        handleCloseModal,
        mainRef,
        modalContent,
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
