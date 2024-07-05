import styled from "styled-components";

const StyledStatstic = styled.div`
  background-color: var(--color-Gray-0);
  color: var(--color-Gray-900);
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 1.25rem 0.75rem;
  gap: 0.5rem;
  border: 1px solid var(--color-Gray-200);
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  & svg {
    width: 3.5rem;
    height: 3.5rem;
    padding: 0.75rem;
    border-radius: 5rem;
    color: var(--color-${(props) => props.color}-700);
    background-color: var(--color-${(props) => props.color}-100);
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  & div p {
    font-weight: 600;
    margin: 0;
    color: var(--color-Gray-900);
  }

  & div p.title {
    color: var(--color-Gray-500);
    font-size: 0.9rem;
  }

  & div p.value {
    font-size: 1.2rem;
  }
`;
function Statistic({ title, icon, value, color }) {
  return (
    <StyledStatstic color={color}>
      {icon}
      <div>
        <p className="title">{title}</p>
        <p className="value">{value}</p>
      </div>
    </StyledStatstic>
  );
}

export default Statistic;
