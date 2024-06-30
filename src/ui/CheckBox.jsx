import styled, { css } from "styled-components";

const CheckBox = styled.div`
  margin-top: 1rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  background-color: var(--color-Gray-0);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  color: var(--color-Gray-900);
  border: 1px solid var(--color-Gray-200);
  & input[type="checkbox"] {
    accent-color: var(--color-green-500);
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
  & input[type="checkbox"]:disabled {
    cursor: not-allowed;
  }
  ${(props) =>
    props.state === "true" &&
    css`
      color: var(--color-Gray-600);
    `}
`;
export default CheckBox;
