import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";

const StyledContextMenu = styled.ul`
  position: absolute;
  right: 30%;
  top: -20%;
  transform: translate(0, -10%);
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.35rem;
  background-color: white;
  padding: 0.5rem 0.75rem;
  box-shadow: 0px 0px 3px 0 #cbd5e1;
  width: max-content;
  height: max-content;
  list-style-type: none;
  & li {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-align: left !important;
    padding: 0.25rem 0;
    cursor: pointer;
  }
  & li svg {
    color: var(--color-Gray-500);
    transition: all 0.3s;
  }
  & li:hover svg {
    color: var(--color-green-500);
  }
`;
function ContextMenu({ children, setShowContext }) {
  const ref = useOutsideClick(setShowContext);

  return <StyledContextMenu ref={ref}>{children}</StyledContextMenu>;
}

export default ContextMenu;
