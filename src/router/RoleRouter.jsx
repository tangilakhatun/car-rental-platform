import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const RoleRoute = ({ children, role }) => {
  const { user, role: userRole, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
