import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../Sidebar/SideNav.jsx";
import Header from "./Header.jsx";

const Layout = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 bg-white shadow-lg transition-transform duration-300 z-50`}
      >
        <SideNav />
      </div>
      <div className="flex flex-col flex-grow w-full md:ml-64">
        <Header onMenuClick={() => setSideNavOpen(!isSideNavOpen)} />
        <div className="p-4 flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
      {isSideNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSideNavOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
