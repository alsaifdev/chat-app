import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Public = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : children;
};

export default Public;
