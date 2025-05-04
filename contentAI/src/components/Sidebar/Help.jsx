import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../store/atoms/authAtom';

const Help = () => {

  const user = useRecoilValue(userAtom);
  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email,
    issue: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(`http://localhost:3005/api/v1/user/save-issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          formData: formData,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to save data.");
      setSuccessMessage('Your request has been submitted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage('There was an error submitting your request. Please try again later.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Help / Support</h2>
      <p className="mb-6">If you are facing any issues or need to request a change, please fill out the form below.</p>

      {/* Success/Error Messages */}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold text-gray-700">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            // value={formData.name}
            // onChange={handleInputChange}
            disabled= {true}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            // onChange={handleInputChange}
            disabled= {true}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        {/* Issue Type */}
        <div className="mb-4">
          <label htmlFor="issue" className="block text-sm font-bold text-gray-700">Issue Type</label>
          <select
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an issue</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature Request</option>
            <option value="account">Account Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Describe your issue or request"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Help;
