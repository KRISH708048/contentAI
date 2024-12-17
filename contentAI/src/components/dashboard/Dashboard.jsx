import React, { useState } from "react";
import TemplateSection from "../pages/TemplateSection";
import SearchSection from "../pages/SearchSection";

const Dashboard = () => {
  const [userSearch, setUserSearch] = useState("");

  return (
    <div className="p-2 w-full flex-col gap-4">
      <div className="p-4 flex-col bg-violet-500 gap-4 rounded-md">
        <h1 className="font-playwrite flex justify-center text-2xl mb-2">
          Browse Template
        </h1>
        <div className="flex justify-center">
          <SearchSection onchange={(value) => setUserSearch(value)} />
        </div>
      </div>
      <TemplateSection userInput={userSearch} />
    </div>
  );
};

export default Dashboard;
