import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      setHistory(data.data || []);  
    } catch (err) {
      console.error("Error fetching history:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("AI Response copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : history.length === 0 ? (
        <p>No history found!</p>
      ) : (
        <Table
          className='border-4 rounded-lg border-violet-300'
          aria-label="History Table"
          sx={{
            "& thead th": { fontWeight: "bold", textAlign: "left" },
            "& tbody td": { verticalAlign: "top", padding: "8px" },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "10%", textAlign: "center"}}>Template</th>
              <th style={{ width: "50%", textAlign: "center" }}>AI Response</th>
              <th style={{ width: "10%", textAlign: "center" }}>Words</th>
              <th style={{ width: "20%", textAlign: "center" }}>Created At</th>
              <th style={{ width: "10%", textAlign: "center" }}>COPY</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td style={{ width: "10%", textAlign: "center"}}>{entry.templatesSlug}</td>
                <td style={{ width: "50%", textAlign: "center"}}>
                  <div
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {entry.aiResponse || "No response"}
                  </div>
                </td>
                <td style={{ width: "10%", textAlign: "center"}}>{entry.words}</td>
                <td style={{ width: "10%", textAlign: "center"}}>{new Date(entry.createdAt).toLocaleString()}</td>
                <td style={{ width: "10%", textAlign: "center"}}><Button color="primary" onClick={() => handleCopy(entry.aiResponse || "No response")}>Copy</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default History;
