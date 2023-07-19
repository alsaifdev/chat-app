import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Privet = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export default Privet;
