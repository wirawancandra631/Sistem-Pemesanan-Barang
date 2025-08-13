import { Accordion, Avatar, Button, Popover } from "@mantine/core";
import React, { useContext } from "react";
import {
  BsChevronBarRight,
  BsDatabase,
  BsHouse,
  BsPeople,
  BsStar,
  BsWindowPlus,
} from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../middleware/DashboardMiddleware";

function DashboardLayout() {
  const { user } = useContext(UserContext);
  return (
    <main className="w-full bg-slate-200 h-screen flex">
      <aside className="md:w-[20%] h-screen  bg-white border-l-12 border-green-500">
        <div className="w-full p-4">
          <p className="text-center  text-xl font-bold">Dashboard</p>
        </div>
        <div className="my-4 p-2">
          <NavLink className="flex ml-4">
            <BsHouse className="mr-4" />
            <span>Home</span>
          </NavLink>
        </div>
        <div className="my-4 p-2">
          <Accordion>
            <Accordion.Item value="Master Data">
              <Accordion.Control icon={<BsDatabase />}>
                <span className="">Master Data</span>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-6">
                  <li className="mb-2">
                    <Link to={"/master-data/product"}>Data Produk</Link>
                  </li>

                  <li className="mb-2">
                    <Link to={"/master-data/category-product"}>
                      Kategori Produk
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to={"/master-data/brand-product"}>Merek Produk</Link>
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="my-4 p-2">
          <Accordion>
            <Accordion.Item value="Master Data">
              <Accordion.Control icon={<BsStar />}>
                <span className="">Marketing</span>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-6">
                  <li className="mb-2">
                    <Link to={"/marketing/product-recomendation"}>
                      Promosikan produk
                    </Link>
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="my-4 p-2">
          <Accordion>
            <Accordion.Item value="Master Data">
              <Accordion.Control icon={<BsPeople />}>
                <span className="">Customer</span>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-6">
                  <li className="mb-2">
                    <Link to={"/customer"}>Data Customer</Link>
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </aside>
      <section className="md:w-[80%] h-screen overflow-y-auto  flex flex-col justify-between">
        <div className="w-full p-4">
          <header className="w-full p-4 bg-green-500 rounded-md flex justify-between">
            <p className="text-white text-2xl font-bold">
              Selamat datang {user.email}
            </p>
            <Popover>
              <Popover.Target>
                <BsPeople className="text-2xl text-white" />
              </Popover.Target>
              <Popover.Dropdown>
                <ul>
                  <li className="mb-2">
                    <Link to={"/profil"}>
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
          <div className="w-full my-5">
            <Outlet />
          </div>
        </div>
        <footer className="w-full bg-slate-900 p-4">
          <p className="text-center text-white">CopyRight @ 2025</p>
        </footer>
      </section>
    </main>
  );
}

export default DashboardLayout;
