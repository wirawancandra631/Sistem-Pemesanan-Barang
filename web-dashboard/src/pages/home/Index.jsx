import React, { useContext } from "react";
import {
  BsChevronBarRight,
  BsDatabase,
  BsPeople,
  BsPeopleFill,
  BsStar,
  BsWindowPlus,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { Button, Popover, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";
import { UserContext } from "../../middleware/DashboardMiddleware";
import { useFetchDashboardInformation } from "../../utils/fetch/useDashboardInformation";
function HomePage() {
  const { user } = useContext(UserContext);

  const { data } = useFetchDashboardInformation();
  return (
    <>
      <header className="w-full p-4 bg-orange-500 rounded-md flex justify-between">
        <p className="text-white text-xl font-bold">
          Selamat datang {user.email}
        </p>
        <Popover>
          <Tooltip label="Pengaturan profil">
            <Popover.Target>
              <FaUserCircle className="text-2xl text-white" />
            </Popover.Target>
          </Tooltip>

          <Popover.Dropdown>
            <ul>
              <li className="mb-2">
                <Link to={"/settings/user/profil"}>
                  <Button
                    variant={"outline"}
                    fullWidth
                    rightSection={<BsWindowPlus />}
                  >
                    Profil
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  color={"red"}
                  rightSection={<BsChevronBarRight />}
                  onClick={() => (window.location.href = "/logout")}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </Popover.Dropdown>
        </Popover>
      </header>
      <div className="w-full min-h-[350px] mt-4 p-2">
        <p className="text-right">{new Date().toDateString()}</p>
        {data ? (
          <div className="w-full mt-4 flex md:flex-nowrap flex-wrap">
            <Tooltip label="Jumlah data produk">
              <div className="md:w-[30%] w-full border-2 border-slate-200 mr-2 mb-2 bg-white">
                <div className="w-full p-2 bg-green-500">
                  <BsDatabase className="ml-auto text-white" />
                </div>
                <div className="w-full py-16 px-4 ">
                  <p className="font-bold text-2xl">
                    {data.count_product} Produk
                  </p>
                </div>
              </div>
            </Tooltip>
            <Tooltip label="Jumlah produk yang direkomendasikan">
              <div className="md:w-[30%] w-full border-2 border-slate-200 mr-2 mb-2 bg-white">
                <div className="w-full p-2 bg-blue-500">
                  <BsStar className="ml-auto text-white" />
                </div>
                <div className="w-full py-16 px-4 ">
                  <p className="font-bold text-2xl">
                    {data.count_product_recomendation} Produk Rekomendasi
                  </p>
                </div>
              </div>
            </Tooltip>
            <Tooltip label="Jumlah customer">
              <div className="md:w-[30%] w-full border-2 border-slate-200 mr-2 mb-2 bg-white">
                <div className="w-full p-2 bg-purple-500">
                  <BsPeople className="ml-auto text-white" />
                </div>
                <div className="w-full py-16 px-4 ">
                  <p className="font-bold text-2xl">
                    {data.count_customer} Customer
                  </p>
                </div>
              </div>
            </Tooltip>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default HomePage;
