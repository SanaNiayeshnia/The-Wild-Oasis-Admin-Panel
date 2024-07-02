import styled from "styled-components";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGeneralContext } from "../../contexts/GeneralContext";

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
    min: 1,
    max: 1,
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
    min: 2,
    max: 2,
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
    min: 3,
    max: 3,
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
    min: 4,
    max: 5,
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
    min: 6,
    max: 7,
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
    min: 8,
    max: 14,
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
    min: 15,
    max: 21,
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
    min: 21,
    max: Infinity,
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
    min: 1,
    max: 1,
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
    min: 2,
    max: 2,
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
    min: 3,
    max: 3,
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
    min: 4,
    max: 5,
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
    min: 6,
    max: 7,
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
    min: 8,
    max: 14,
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
    min: 15,
    max: 21,
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
    min: 21,
    max: Infinity,
  },
];

const StyledPieChartComponent = styled.div`
  background-color: var(--color-Gray-0);
  padding: 1.5rem;
  grid-column: 1/-3;
  height: 320px;
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  & p {
    color: var(--color-Gray-900);
    margin: 0;
    font-weight: 600;
  }
`;

function PieChartComponent({ stays }) {
  const { isDarkMode } = useGeneralContext();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = startData.map((data) => {
    return {
      ...data,
      value: stays?.reduce(
        (totalNights, stay) =>
          stay.numNights >= data.min && stay.numNights <= data.max
            ? totalNights + stay.numNights
            : totalNights,
        0
      ),
    };
  });

  return (
    <StyledPieChartComponent>
      <p>Stay duration summary</p>
      <ResponsiveContainer>
        <PieChart width="100%" height="100%" margin={{ top: 0 }}>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={3}
            nameKey="duration"
            dataKey="value"
          >
            {data.map((d, index) => (
              <Cell key={`cell-${index}`} fill={d.color} />
            ))}
          </Pie>
          <Legend
            align="right"
            verticalAlign="middle"
            layout="vertical"
            width="30%"
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledPieChartComponent>
  );
}

export default PieChartComponent;
