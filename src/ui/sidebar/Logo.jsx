import styled from "styled-components";

const StyledLogo = styled.img`
  max-width: ${(prop) => prop.minwidth};
`;
function Logo({ minwidth }) {
  return (
    <StyledLogo
      minwidth={minwidth}
      src="../../../public/imgs/logo-light.png"
      alt="The wild Oasis Logo"
    />
  );
}

export default Logo;
