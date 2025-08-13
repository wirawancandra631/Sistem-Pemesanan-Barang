import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import router from "./route/route";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </MantineProvider>
  </StrictMode>
);
