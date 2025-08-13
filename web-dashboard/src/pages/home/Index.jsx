import React, { useContext } from "react";
import { BsDatabase, BsPeople, BsStar } from "react-icons/bs";
import { UserContext } from "../../middleware/DashboardMiddleware";
import { useFetchDashboardInformation } from "../../utils/fetch/useDashboardInformation";
function HomePage() {
  const { data, loading } = useFetchDashboardInformation();
  return (
    <div className="w-full bg-white min-h-[350px] p-4">
      <p className="text-right">{new Date().toDateString()}</p>
      {data ? (
        <div className="w-full mt-4 flex md:flex-nowrap flex-wrap">
          <div className="md:w-[30%] w-full border-2 border-slate-200 mr-2 mb-2">
            <div className="w-full p-2 bg-green-500">
              <BsDatabase className="ml-auto text-white" />
            </div>
            <div className="w-full py-16 px-4 ">
              <p className="font-bold text-2xl">{data.count_product} Produk</p>
            </div>
          </div>

          <div className="md:w-[30%] w-full border-2 border-slate-200 mr-2 mb-2">
            <div className="w-full p-2 bg-blue-500">
              <BsStar className="ml-auto text-white" />
            </div>
            <div className="w-full py-16 px-4 ">
              <p className="font-bold text-2xl">
                {data.count_product_recomendation} Produk Rekomendasi
              </p>
            </div>
          </div>
          <div className="md:w-[30%] w-full border-2 border-slate-200 mr-2 mb-2">
            <div className="w-full p-2 bg-purple-500">
              <BsPeople className="ml-auto text-white" />
            </div>
            <div className="w-full py-16 px-4 ">
              <p className="font-bold text-2xl">
                {data.count_customer} Customer
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
