import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useGeneralContext } from "../contexts/GeneralContext";
const FullPage = styled.div`
  height: calc(100vh - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-Gray-0);
`;
function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner type="primary" />
      </FullPage>
    );
  if (isAuthenticated) return children;
  return null;
}

export default ProtectedRoute;
