import React, { useState } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

const Form = ({ setCurForm, filteredForm, loading }) => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    setCurForm(formValues);
  };

  const formFields = filteredForm.length > 0 ? filteredForm[0].form : [];

  return (
    <form
      onSubmit={submitForm}
      className="p-4 flex-col gap-6 border rounded-md shadow bg-white"
    >
      <img
        src={filteredForm[0]?.icon || ""}
        alt="icon"
        className="w-28 h-28 object-contain"
      />
      <p>{filteredForm[0]?.description || "No description available."}</p>
      {formFields.map((formField, index) => (
        <div key={index} className="mb-4 mt-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            {formField.label}
          </label>
          {formField.field === "input" ? (
            <Input
              type={formField.type}
              name={formField.name}
              required={formField.required}
              placeholder={formField.placeholder || ""}
              value={formValues[formField.name] || ""}
              onChange={handleInputChange}
              className="w-full"
            />
          ) : formField.field === "textarea" ? (
            <Textarea
              name={formField.name}
              minRows={3}
              placeholder={formField.placeholder || ""}
              value={formValues[formField.name] || ""}
              onChange={handleInputChange}
              className="w-full max-h-44 scroll-m-1"
              // style={{
              //   maxHeight: "150px", // Limit the height
              //   overflow: "auto",   // Add scroll for overflowing content
              //   resize: "none",     // Disable resizing or use "horizontal" for only horizontal resize
              // }}
            />
          ) : (
            <p className="text-red-500">Unsupported field type</p>
          )}
        </div>
      ))}
      <div className="flex justify-center">
        <Button className="w-1/2" type="submit" color="success" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
