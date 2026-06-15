import { useState } from "react";
import API from "../services/api";
import TestCaseTable from "./TestCaseTable";

function GenerateTestCases() {
  const [requirement, setRequirement] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!requirement.trim()) {
      alert("Please enter a requirement");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/generate-testcases",
        {
          requirement: requirement,
        }
      );

      setResult(response.data);

    } catch (error) {
      console.error(error);

      alert(
        "Error generating test cases"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        margin: "30px",
        padding: "25px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>
        Generate Test Cases
      </h2>

      <p>
        Enter a requirement and generate
        AI-powered functional test cases.
      </p>

      <textarea
        rows="6"
        value={requirement}
        onChange={(e) =>
          setRequirement(e.target.value)
        }
        placeholder="Example: User should login using username and password"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      <br />
      <br />

      <button
        onClick={generate}
        disabled={loading}
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading
          ? "Generating..."
          : "Generate Test Cases"}
      </button>

      <TestCaseTable
        testCases={result}
      />
    </div>
  );
}

export default GenerateTestCases;