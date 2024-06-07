import styled from "styled-components";
const Tbody = styled.tbody`
  & tr:not(:last-child) {
    border-bottom: 2px solid var(--color-Gray-100);
  }
`;
export default Tbody;
