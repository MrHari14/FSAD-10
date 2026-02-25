import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;