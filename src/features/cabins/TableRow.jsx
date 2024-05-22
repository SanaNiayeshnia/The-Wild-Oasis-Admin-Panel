import styled from "styled-components";
const StyledTableRow = styled.tr`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  & td,
  & th {
    width: calc(100% / 6);
    text-align: center;
    color: var(--color-Gray-800);
  }

  & th {
    font-weight: 600;
  }

  & td button {
    margin: 0 auto;
  }
`;
function TableRow({ children }) {
  return <StyledTableRow>{children}</StyledTableRow>;
}

export default TableRow;
