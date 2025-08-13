import React from "react";
import { ClockLoader } from "react-spinners";

function LoadingDataComponent() {
  return (
    <div className="w-full p-4 h-[250px] flex justify-center items-center flex-col">
      <ClockLoader className="mx-auto mb-4" />
      <p>Memuat data</p>
    </div>
  );
}

export default LoadingDataComponent;
