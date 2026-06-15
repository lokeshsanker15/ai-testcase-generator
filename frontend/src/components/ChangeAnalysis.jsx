import { useState } from "react";
import API from "../services/api";
import ImpactAnalysisViewer from "./ImpactAnalysisViewer";

function ChangeAnalysis() {

  const [changeRequest, setChangeRequest] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const analyze = async () => {

    if (!changeRequest.trim()) {

      alert(
        "Please enter a change request"
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await API.post(
          "/analyze-change",
          {
            change_request:
              changeRequest
          }
        );

      setResult(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Analysis Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        margin: "20px",
        padding: "25px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow:
          "0px 2px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2
        style={{
          textAlign: "center"
        }}
      >
        Change Impact Analysis
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#64748b"
        }}
      >
        Enter a change request and identify impacted test cases using RAG + AI.
      </p>

      <textarea
        rows="6"
        value={changeRequest}
        onChange={(e) =>
          setChangeRequest(
            e.target.value
          )
        }
        placeholder="Example: Add biometric authentication to login process"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border:
            "1px solid #ccc",
          fontSize: "14px"
        }}
      />

      <br />
      <br />

      <div
        style={{
          textAlign: "center"
        }}
      >
        <button
          onClick={analyze}
          disabled={loading}
          style={{
            backgroundColor:
              "#1e293b",
            color: "white",
            padding:
              "12px 24px",
            border: "none",
            borderRadius:
              "5px",
            cursor: "pointer",
            fontWeight:
              "bold"
          }}
        >
          {
            loading
              ? "Analyzing..."
              : "Analyze Change"
          }
        </button>
      </div>

      {result && (

        <ImpactAnalysisViewer
          result={result}
        />

      )}

    </div>
  );
}

export default ChangeAnalysis;