import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../Sidebar/SideNav.jsx";
import Header from "./Header.jsx";

const Layout = () => {
  return (
    <div className="flex">
      <div className="md:w-64 hidden md:block fixed h-screen">
        <SideNav />
      </div>

      <div className="md:ml-64 flex flex-col flex-grow w-full h-screen ">
        <Header />
        <div className="p-4 flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
