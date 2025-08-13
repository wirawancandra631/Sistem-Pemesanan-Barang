import React from "react";

function LogoutPage() {
  const token = window.localStorage.getItem("token");
  if (token) {
    window.localStorage.removeItem("token");
  }
  return (window.location.href = "/auth");
}

export default LogoutPage;
