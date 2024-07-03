import styled from "styled-components";
import Activity from "./Activity";
import useTodaysBookings from "./useTodaysBookings";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";

const StyledTodaysActivity = styled.div`
  background-color: var(--color-Gray-0);
  padding: 1.5rem;
  grid-column: 1/3;
  height: 320px;
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  & p.title {
    color: var(--color-Gray-900);
    margin: 0;
    font-weight: 600;
  }
  & .scrollBox {
    overflow: auto;
    display: grid;
    place-items: center;
    height: 90%;
    & div:not(:last-child) {
      border-bottom: 1px solid var(--color-Gray-200);
    }
  }
  & .scrollBox::-webkit-scrollbar {
    appearance: none;
    width: 0.25rem;
    background-color: var(--color-Gray-300);
    transition: all 0.3s;
  }
  & .scrollBox::-webkit-scrollbar-thumb {
    width: 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--color-Gray-400);
    transition: all 0.3s;
  }
  & .scrollBox::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-green-500);
  }
  & .no-activity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-Gray-700);
    & svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

function TodaysActivity() {
  const { todaysBookings, isLoading, count } = useTodaysBookings();
  return (
    <StyledTodaysActivity>
      <p className="title">Today </p>
      <div className="scrollBox">
        {isLoading && <Spinner type="secondary" />}
        {!isLoading && count === 0 && (
          <p className="no-activity">
            No activity for today <HiOutlineFaceFrown />
          </p>
        )}
        {!isLoading &&
          count !== 0 &&
          todaysBookings.map((booking) => (
            <Activity booking={booking} key={booking.id} />
          ))}
      </div>
    </StyledTodaysActivity>
  );
}

export default TodaysActivity;
