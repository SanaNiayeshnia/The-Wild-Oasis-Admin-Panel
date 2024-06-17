import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const { isLoading, user, isAuthenticated } = useUser();
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
