import styled from "styled-components";
import { useGeneralContext } from "../../contexts/GeneralContext";

const StyledLogo = styled.img`
  max-width: ${(prop) => prop.minwidth};
`;
function Logo({ minwidth }) {
  const { isDarkMode } = useGeneralContext();
  return (
    <StyledLogo
      minwidth={minwidth}
      src={
        isDarkMode
          ? "../../../public/imgs/logo-dark.png"
          : "../../../public/imgs/logo-light.png"
      }
      alt="The wild Oasis Logo"
    />
  );
}

export default Logo;
