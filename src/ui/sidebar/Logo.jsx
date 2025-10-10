import styled from "styled-components";
import { useGeneralContext } from "../../contexts/GeneralContext";
import { Link } from "react-router-dom";

const StyledLogo = styled.img`
  max-width: ${(prop) => prop.minwidth};
`;
function Logo({ minwidth }) {
  const { isDarkMode } = useGeneralContext();
  return (
    <Link to="/">
      <StyledLogo
        minwidth={minwidth}
        src={isDarkMode ? "/imgs/logo-dark.png" : "/imgs/logo-light.png"}
        alt="The wild Oasis Logo"
      />
    </Link>
  );
}

export default Logo;
