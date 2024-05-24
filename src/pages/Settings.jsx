import styled from "styled-components";
import SettingsForm from "../features/settings/SettingsForm";

const StyledSettings = styled.div`
  padding: 0 1rem;
  max-width: 55rem;
  margin: auto;
`;
const SettingsHead = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-Gray-800);
  padding: 0 1.5rem;
`;
function Settings() {
  return (
    <StyledSettings>
      <SettingsHead>Hotel Settings</SettingsHead>
      <SettingsForm />
    </StyledSettings>
  );
}

export default Settings;
