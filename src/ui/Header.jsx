import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 1rem;
  border-bottom: 2px solid var(--color-Gray-100);
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
