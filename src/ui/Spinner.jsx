import styled from "styled-components";

const PrimaryImg = styled.img`
  max-width: 70px;
`;
const SecondaryImg = styled.img`
  max-width: 20px;
  margin-right: 0.25rem;
`;
const StyledSpinner = styled.div`
  text-align: center;
`;
function Spinner({ type }) {
  return (
    <StyledSpinner>
      {type === "primary" && (
        <PrimaryImg src="./imgs/Loader.gif" alt="Loader"></PrimaryImg>
      )}
      {type === "secondary" && (
        <SecondaryImg src="./imgs/spinner.gif" alt="Loader"></SecondaryImg>
      )}
    </StyledSpinner>
  );
}

export default Spinner;
