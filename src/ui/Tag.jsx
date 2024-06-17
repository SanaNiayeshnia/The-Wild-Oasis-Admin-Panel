import styled from "styled-components";

const StyledTag = styled.p`
  border-radius: 1rem;
  font-size: 0.85rem;
  text-align: center;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-${(props) => props.statuscolor}-100);
  color: var(--color-${(props) => props.statusColor}-700);
`;

function Tag({ style, statuses, children }) {
  const statuscolor = statuses?.find(
    (status) => status.name === children
  ).color;
  return (
    <StyledTag style={style} statuscolor={statuscolor}>
      {children?.toUpperCase()}
    </StyledTag>
  );
}

export default Tag;
