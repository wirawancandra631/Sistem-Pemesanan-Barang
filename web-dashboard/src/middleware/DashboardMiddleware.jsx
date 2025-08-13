import React, { createContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useFetchProfil } from "../utils/fetch/useProfil";
export const UserContext = createContext();
function DashboardMiddleware({ children }) {
  const { data: user } = useFetchProfil();
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/auth"} />;
  } else if (user) {
    return (
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
  } else {
    return null;
  }
}

export default DashboardMiddleware;
