import { LoadingOverlay } from "@mantine/core";
import React, { createContext } from "react";
import { Navigate } from "react-router-dom";
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
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />
    );
  }
}

export default DashboardMiddleware;
