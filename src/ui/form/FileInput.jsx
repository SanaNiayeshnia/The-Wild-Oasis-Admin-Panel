import styled from "styled-components";
const FileInput = styled.input.attrs({ type: "file" })`
  &::file-selector-button {
    background-color: var(--color-Gray-100);
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    color: var(--color-Gray-900);
  }
  &::file-selector-button:hover {
    background-color: var(--color-Gray-200);
  }
`;
export default FileInput;
