import styled from "styled-components";

const PrimaryImg = styled.img`
  max-width: 70px;
`;
const SecondaryImg = styled.img`
  max-width: 17px;
  margin-right: 0.25rem;
`;
const StyledSpinner = styled.div`
  text-align: center;
  & img {
    vertical-align: middle;
  }
`;
function Spinner({ type }) {
  return (
    <StyledSpinner>
      {type === "primary" && (
        <PrimaryImg
          src="../../public/imgs/Loader.gif"
          alt="Loader"
        ></PrimaryImg>
      )}
      {type === "secondary" && (
        <SecondaryImg
          src="../../public/imgs/spinner.gif"
          alt="Loader"
        ></SecondaryImg>
      )}
    </StyledSpinner>
  );
}

export default Spinner;
