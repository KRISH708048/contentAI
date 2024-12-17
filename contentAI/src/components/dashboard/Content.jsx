import React from "react";
import { useParams } from "react-router-dom";

const Content = () => {
  const { slug } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Content for {slug}</h1>
    </div>
  );
};

export default Content;
