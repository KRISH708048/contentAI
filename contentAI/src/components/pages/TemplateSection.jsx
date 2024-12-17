import React, { useState, useEffect } from "react"; 
import Template from "./Template";
import TemplateCard from "./TemplateCard";

const TemplateSection = ({ userInput }) => {
  const [tempList, setTempList] = useState(Template);

  useEffect(() => {
    if (userInput) {
      const filteredTemplates = Template.filter((item) =>
        item.name.toLowerCase().includes(userInput.toLowerCase())
      );
      setTempList(filteredTemplates);
    } else {
      setTempList(Template); 
    }
  }, [userInput]);

  return (
    <div className="p-5 shadow-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tempList.map((item, index) => (
        <TemplateCard key={index} item={item} />
      ))}
    </div>
  );
};

export default TemplateSection;
