import { useEffect } from "react";
import { APP_NAME } from "../utilities/constants";
import styled from "styled-components";
import { TbFileSad } from "react-icons/tb";

const StyledPageNotFound = styled.div`
  min-width: 950px;
  max-width: 950px;
  max-height: min-content;
  height: 100%;
  margin: auto;
  display: grid;
  align-items: center;
  place-items: center;
  & div {
    display: flex;
    align-items: center;
    & p {
      font-size: 1.5rem;
      color: var(--color-Gray-900);
    }
    & svg {
      width: 2.5rem;
      height: 2.5rem;
      color: var(--color-green-600);
    }
  }
`;
function PageNotFound() {
  useEffect(() => {
    document.title = `${APP_NAME} - 404`;
  }, []);

  return (
    <StyledPageNotFound>
      <div>
        <p>Page Not Found !</p>
        <TbFileSad />
      </div>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
