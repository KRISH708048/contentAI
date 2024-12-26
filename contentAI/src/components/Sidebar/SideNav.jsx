import React, { useEffect } from "react";
import logo from "../../assets/logo.svg";
import {
  Building,
  HelpingHandIcon,
  HomeIcon,
  LogOutIcon,
  Settings,
  Signature,
  User,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const SideNav = () => {
  const menuList = [
    { name: "Home", icon: HomeIcon, path: "/Dashboard" },
    { name: "Help", icon: HelpingHandIcon, path: "/Help" },
    { name: "Billing", icon: Signature, path: "/Billing" },
    { name: "History", icon: Building, path: "/History" },
  ];

  const userMenu = [
    { name: "Profile", icon: User, path: "/Profile" },
    { name: "Settings", icon: Settings, path: "/Settings" },
    // { name: "Logout", icon: LogOutIcon, path: "/Logout" },
  ];

  const currentRoute = useLocation();

  return (
    <div className="flex flex-col h-screen pl-3 pr-3 pb-3 border-r-2">
      <div className="w-full flex justify-center mb-3 border-b-2 h-16">
        <img src={logo} alt="Logo" className="w-16 h-16" />
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {menuList.map((menu, index) => (
          <NavLink to={menu.path} key={index}>
            <div
              key={index}
              className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg hover:bg-violet-600 ${
                currentRoute.pathname === menu.path
                  ? "bg-violet-400 text-white"
                  : ""
              }`}
            >
              <menu.icon
                className={`${
                  currentRoute.pathname === menu.path
                    ? "text-white"
                    : "text-blue-500"
                }`}
              />
              <h2
                className={`${
                  currentRoute.pathname === menu.path
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {menu.name}
              </h2>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {userMenu.map((menu, index) => (
          <NavLink to={menu.path} key={index}>
            <div
              className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg hover:bg-violet-600 ${
                currentRoute.pathname === menu.path
                  ? "bg-violet-500 text-white"
                  : ""
              }`}
            >
              <menu.icon
                className={`${
                  currentRoute.pathname === menu.path
                    ? "text-white"
                    : "text-blue-500"
                }`}
              />
              <h2
                className={`${
                  currentRoute.pathname === menu.path
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {menu.name}
              </h2>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
