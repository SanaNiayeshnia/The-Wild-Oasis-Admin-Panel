import styled from "styled-components";
const LastTd = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  & button {
    text-align: center;
    margin: 0 !important;
  }
  & svg {
    width: 1.25em;
    height: 1.25em;
    cursor: pointer;
    transition: all 0.3s;
  }
  & svg:hover {
    transform: scale(1.1);
  }
  & svg.deleteBtn {
    color: var(--color-red-500);
  }

  & svg.duplicateBtn {
    color: var(--color-Gray-400);
  }
`;
export default LastTd;
