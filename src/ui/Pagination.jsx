import TableRow from "./table/TableRow";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utilities/constants";

const StyledPagination = styled.tfoot`
  background-color: var(--color-Gray-100);
  font-size: 1rem;
  & tr:last-child span {
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }
  & tr:last-child span:hover {
    color: var(--color-green-700);
  }
  & tr td:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
  & tr td span {
    display: flex;
    align-items: center;
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentpage =
    searchParams.get("page") === null ? 1 : Number(searchParams.get("page"));
  const isReachedTheEnd = currentpage * PAGE_SIZE >= count;
  function goPreviousPage() {
    searchParams.set("page", currentpage - 1 <= 0 ? 1 : currentpage - 1);
    setSearchParams(searchParams);
  }
  function goNextPage() {
    searchParams.set("page", isReachedTheEnd ? currentpage : currentpage + 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <TableRow gridcols="4fr 1fr">
        <td>
          Showing <strong>{currentpage * PAGE_SIZE - (PAGE_SIZE - 1)}</strong>{" "}
          to{" "}
          <strong>{isReachedTheEnd ? count : currentpage * PAGE_SIZE}</strong>{" "}
          of <strong>{count}</strong> results
        </td>
        <td>
          {currentpage !== 1 && (
            <span onClick={goPreviousPage}>
              <MdArrowBackIos />
              Previous
            </span>
          )}

          {!isReachedTheEnd && (
            <span onClick={goNextPage}>
              Next
              <MdArrowForwardIos />
            </span>
          )}
        </td>
      </TableRow>
    </StyledPagination>
  );
}

export default Pagination;
