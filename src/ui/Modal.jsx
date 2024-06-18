import styled from "styled-components";
import { useGeneralContext } from "../contexts/GeneralContext";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  display: none;
  position: absolute;
  background-color: #37415142;
  backdrop-filter: blur(2px);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.show {
    display: block;
  }
  &.show div {
    animation: showModal 0.5s forwards;
  }
  &:not(.no-padding) div {
    padding: 1.5rem 1rem;
  }
  z-index: 10;
`;
const ModalWindow = styled.div`
  position: fixed;
  min-width: 18rem;
  min-height: 5rem;
  text-align: justify;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 8px 0 #000000a0;
  left: 50%;
  top: -100%;
  transition: all 0.3s;
  transform: translate(-50%, -50%);

  & svg {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
    width: 1.25rem;
    height: 1.25rem;
  }
  & svg:hover {
    transform: scale(1.1);
  }
  @keyframes showModal {
    from {
      top: -100%;
    }
    to {
      top: 50%;
    }
  }
`;
const ModalText = styled.div`
  font-size: 0.9rem;
`;
function Modal({ className = "" }) {
  const { modalContent, handleCloseModal } = useGeneralContext();
  const ref = useOutsideClick(handleCloseModal);
  return (
    <StyledModal className={className}>
      <ModalWindow ref={ref}>
        <ModalText>{modalContent}</ModalText>
        <IoClose onClick={handleCloseModal} />
      </ModalWindow>
    </StyledModal>
  );
}

export default Modal;
