import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledContextMenu = styled.ul`
  position: absolute;
  right: 100%;
  top: 20%;
  transform: translate(0, -10%);
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.25rem;
  background-color: white;
  padding: 0.25rem 0.5rem;
  box-shadow: 0px 0px 2px 0px #cbd5e1;
  width: max-content;
  height: max-content;
  list-style-type: none;
  margin: 0;
  & li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-align: left !important;
    padding: 0.25rem 0;
    cursor: pointer;
    font-size: 0.9rem;
  }
  & li svg {
    width: 1rem;
    height: 1rem;
    color: var(--color-Gray-500);
    transition: all 0.3s;
  }
  & li:hover svg {
    color: var(--color-green-500);
  }
`;
function ContextMenu({ children, setOpenContextId }) {
  const ref = useOutsideClick(() => setOpenContextId(null));

  return <StyledContextMenu ref={ref}>{children}</StyledContextMenu>;
}

export default ContextMenu;
