import React from "react";
import emptyicon from "@/assets/img/empty.png";
function EmptyDataComponent() {
  return (
    <div className="w-full p-4 h-[250px] flex items-center justify-center flex-col flex-wrap">
      <img
        src={emptyicon}
        alt=""
        className="w-[100px] h-[100px] mb-4 block mx-auto"
      />
      <p className="text center mt-4">Tidak ada data untuk ditampilkan</p>
    </div>
  );
}

export default EmptyDataComponent;
