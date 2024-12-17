import React from "react";
import { NavLink } from "react-router-dom";
import Content from "../dashboard/Content";

const TemplateCard = ({ item, index }) => {
  return (
    <NavLink to={`/Dashboard/${item?.slug}`}>
      <div
        className="p-4 shadow-md rounded-md flex flex-col gap-4 cursor-pointer hover:scale-105 transition-transform"
        key={item.slug || index}
        style={{ marginBottom: "16px" }}
      >
        <div className="flex-col justify-center items-center md:flex md:items-center gap-4">
          <img
            className="w-16 h-16 object-contain"
            src={item.icon}
            alt={`${item.category} Icon`}
          />
          <h2 className="text-xl font-semibold line-clamp-1 hover:text-gray-700 text-center md:text-left">
            {item.name}
          </h2>
        </div>

        <p className="line-clamp-3 font-nigeria text-sm text-gray-600">
          {item.description}
        </p>
      </div>
    </NavLink>
  );
};

export default TemplateCard;
