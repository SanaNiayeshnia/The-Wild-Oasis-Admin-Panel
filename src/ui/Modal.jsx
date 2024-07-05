import styled from "styled-components";
import { useGeneralContext } from "../contexts/GeneralContext";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../hooks/useOutsideClick";
import { useEffect, useState } from "react";

const StyledModal = styled.div`
  display: none;
  position: fixed;
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
  min-width: 350px;
  max-width: 600px;
  min-height: 5rem;
  overflow: hidden;
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
    color: var(--color-Gray-900);
  }
  & svg:hover {
    transform: scale(1.1);
  }
  @keyframes showModal {
    from {
      top: -100%;
    }
    to {
      top: ${({ scrollposition }) => `${scrollposition}px`};
    }
  }
`;
const ModalText = styled.div`
  font-size: 0.9rem;
`;
function Modal({ className = "" }) {
  const { modalContent, handleCloseModal, showModal } = useGeneralContext();
  const ref = useOutsideClick(handleCloseModal);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (showModal) {
      setScrollPosition(window.scrollY + window.innerHeight / 2);
    }
  }, [showModal]);

  return (
    <StyledModal className={className}>
      <ModalWindow ref={ref} scrollposition={scrollPosition}>
        <ModalText>{modalContent}</ModalText>
        <IoClose onClick={handleCloseModal} />
      </ModalWindow>
    </StyledModal>
  );
}

export default Modal;
