import React, { useContext } from "react";
import { BsBox, BsBox2, BsGear, BsHouse, BsPeople } from "react-icons/bs";
import { CiBookmark, CiDatabase, CiDiscount1 } from "react-icons/ci";
import { MdCampaign } from "react-icons/md";
import { FaLayerGroup, FaSync } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";

import { Link, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../middleware/DashboardMiddleware";

function DashboardLayout() {
  const { user } = useContext(UserContext);
  return (
    <main className="w-full bg-slate-100  h-screen flex md:flex-nowrap flex-wrap">
      <aside className="md:w-[20%] w-full h-screen bg-white border-r-2 border-slate-50 overflow-y-auto">
        <div className="w-full p-4 text-center flex flex-nowrap items-center justify-center space-x-4">
          <p className="text-md">
            <BsBox />
          </p>
          <p className="font-bold text-md">Dashboard Management</p>
        </div>
        <div className="w-full mt-4">
          <div className="w-full mb-2 px-4">
            <p className="text-slate-700">Default</p>
            <ul className="ml-2 mt-2">
              <li className="mb-2">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <BsHouse />
                  <span className="ml-2">Home Page</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full mb-2 px-4">
            <p className="text-slate-700">Master Data</p>
            <ul className="ml-2 mt-2">
              <li className="mb-2">
                <NavLink
                  to={"/master-data/product"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <BsBox2 />
                  <span className="ml-2">Data Produk</span>
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to={"/master-data/brand-product"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <CiBookmark />
                  <span className="ml-2">Data Merek</span>
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to={"/master-data/category-product"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <FaLayerGroup />
                  <span className="ml-2">Data Kategori</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full mb-2 px-4">
            <p className="text-slate-700">Marketing</p>
            <ul className="ml-2 mt-2">
              <li className="mb-2">
                <NavLink
                  to={"/marketing/product-discount"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <CiDiscount1 />
                  <span className="ml-2">Buat Diskon</span>
                </NavLink>
              </li>

              <li className=" mb-2">
                <NavLink
                  to={"/marketing/product-recomendation"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <MdCampaign />
                  <span className="ml-2">Promosikan Produk</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full mb-4 px-4">
            <p className="text-slate-700">Customer</p>
            <ul className="ml-2 mt-2">
              <li className="mb-2">
                <NavLink
                  to={"/customer/list"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <BsPeople />
                  <span className="ml-2">Kelola Customer</span>
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to={"/customer/import"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <CiDatabase />
                  <span className="ml-2">Import Data</span>
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to={"/customer/sync"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <FaSync />
                  <span className="ml-2">Sinkronisasi Data</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full mb-4 px-4">
            <p className="text-slate-700">Pengaturan</p>
            <ul className="ml-2 mt-2">
              <li className="mb-2">
                <NavLink
                  to={"/settings/user"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <BsGear />
                  <span className="ml-2">User Management</span>
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to={"/settings/store-decoration"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-orange-500 text-white rounded-md w-full flex"
                      : "p-2 hover:bg-orange-500 hover:text-white rounded-md w-full flex"
                  }
                >
                  <IoStorefront />
                  <span className="ml-2">Dekorasi Toko</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full p-8">
          {user ? (
            <Link
              to={"/logout"}
              className="w-full block flex items-center justify-center space-x-4 text-center p-2 bg-red-500 rounded-md text-white"
            >
              <LiaSignOutAltSolid />
              <span>Logout</span>
            </Link>
          ) : null}
        </div>
      </aside>
      <section className="md:w-[80%]  h-screen overflow-y-auto  flex flex-col justify-between">
        <div className="w-full my-5 p-4">
          <Outlet />
        </div>
        <footer className="w-full bg-slate-900 p-4">
          <p className="text-center text-white">CopyRight @ 2025</p>
        </footer>
      </section>
    </main>
  );
}

export default DashboardLayout;
