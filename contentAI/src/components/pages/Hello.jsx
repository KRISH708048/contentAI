import React from "react";

const Hello = ({ name }) => {
  return (
    <div className="p-4 hidden md:block">
      <h1 className="text-2xl font-playwrite">Hello! {name || "Guest"}</h1>
    </div>
  );
};

export default Hello;
