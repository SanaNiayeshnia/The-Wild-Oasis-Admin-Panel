import { HiOutlineFaceFrown } from "react-icons/hi2";
import styled from "styled-components";

const StyledNothingFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-Gray-900);
  gap: 0.25rem;
  margin-top: 2rem;
  & svg {
    width: 1.4rem;
    height: 1.4rem;
    color: var(--color-green-600);
  }
`;
function NothingFound() {
  return (
    <StyledNothingFound>
      Nothing Found! <HiOutlineFaceFrown />
    </StyledNothingFound>
  );
}

export default NothingFound;
