import styled from "styled-components";
const StyledTableRow = styled.tr`
  display: grid;
  align-items: center;
  grid-template-columns: ${(props) => props.gridcols};
  padding: 0.75rem;
  gap: 0.75rem;
  & td,
  & th {
    color: var(--color-Gray-800);
  }

  & th {
    text-align: left;
    font-weight: 600;
  }

  & td button {
    margin: 0 auto;
  }
`;

function TableRow({ gridcols, children }) {
  return <StyledTableRow gridcols={gridcols}>{children}</StyledTableRow>;
}

export default TableRow;
