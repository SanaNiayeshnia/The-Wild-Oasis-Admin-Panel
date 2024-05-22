import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-decoration: none;
  font-weight: 500;
  color: var(--color-Gray-800);
  padding: 0.75rem 0.5rem 0.75rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.3s;
  & svg {
    height: 1.5em;
    width: 1.5em;
    color: var(--color-Gray-500);
  }
  &:hover:not(.active) {
    background-color: var(--color-Gray-100);
    padding-left: 1rem;
  }
  &.active {
    background-color: var(--color-Gray-100);
    color: var(--color-Gray-900);
  }

  &.active svg {
    color: var(--color-green-600);
  }
`;

export default StyledNavLink;
