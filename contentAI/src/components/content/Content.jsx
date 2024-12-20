import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";
import TextOutput from "./TextOutput";
import Template from "../pages/Template";
import { getChatResponse } from "../../../utils/Models";
import Button from "@mui/joy/Button";

const Content = () => {
  const { slug } = useParams();
  const [currentForm, setCurrentForm] = useState(); // stores form values
  const [loading, setLoading] = useState(false); // loading state
  const [aiOutput, setAiOutput] = useState(""); // store gemini output
  const filteredForm = Template.filter((item) => item.slug === slug); // to retrieve current template in use
  const navigateBack = useNavigate();

  const handleBackButton = ()=>{
    navigateBack('/Dashboard');
  }
  const GenerativeAI = async () => {
    if (filteredForm.length === 0 || !currentForm) return;

    try {
      setLoading(true);
      const currentPrompt = filteredForm[0]?.aiPrompt || "";
      const aiPrompt = JSON.stringify(currentForm) + ", " + currentPrompt;
      const result = await getChatResponse(aiPrompt);

      setAiOutput(result);
      console.log("filteredForm[0]?: ", filteredForm[0]?.slug);
      console.log("currentForm: ", currentForm);
      await saveToDatabase(currentForm, filteredForm[0]?.slug, result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setLoading(false);
    }
  };

  const saveToDatabase = async (formData, slug, resultAi) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/save-ai-output", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formData,
          aiResponse: resultAi,
          templatesSlug: slug,
          createdBy: "user",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in saveToDatabase:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (currentForm) GenerativeAI();
  }, [currentForm]);

  return (
    <div className="flex-col p-4 ">
      <Button onClick={handleBackButton} color="neutral">Back</Button>
      <div className=" flex flex-col md:flex-row gap-5 bg-white mt-6">
        <div className="w-full md:w-2/5">
          <Form
            setCurForm={setCurrentForm}
            filteredForm={filteredForm}
            loading={loading}
          />
        </div>
        <div className="w-full md:w-3/4">
          <TextOutput currentForm={currentForm} aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default Content;
