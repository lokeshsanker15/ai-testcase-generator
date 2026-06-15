import { useState } from "react";
import API from "../services/api";

function UploadPdf() {

  const [file, setFile] =
    useState(null);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const uploadPdf = async () => {

    if (!file) {

      alert(
        "Please select a PDF file"
      );

      return;
    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await API.post(
          "/upload-pdf",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      setResult(
        response.data
      );

      console.log(
        "FULL RESPONSE:"
      );

      console.log(
        response.data
      );

      console.log(
        "TEST CASES:"
      );

      console.log(
        response.data.test_cases
      );

    } catch (error) {

      console.error(error);

      alert(
        "PDF Upload Failed"
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
        background: "#ffffff",
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
        Upload Requirement PDF
      </h2>

      <div
        style={{
          textAlign: "center"
        }}
      >

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        <button
          onClick={uploadPdf}
          disabled={loading}
          style={{
            backgroundColor:
              "#1e293b",
            color: "white",
            padding:
              "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {
            loading
              ? "Processing..."
              : "Upload PDF"
          }
        </button>

      </div>

      {result && (

        <div
          style={{
            marginTop: "30px"
          }}
        >

          <h2
            style={{
              textAlign: "center"
            }}
          >
            PDF Processed
          </h2>

          <p
            style={{
              textAlign: "center"
            }}
          >
            <strong>File:</strong>
            {" "}
            {result.file_name}
          </p>

          <p
            style={{
              textAlign: "center"
            }}
          >
            <strong>Text Length:</strong>
            {" "}
            {
              result.extracted_text_length
            }
          </p>

          <p
            style={{
              textAlign: "center"
            }}
          >
            <strong>
              Generated Test Cases:
            </strong>
            {" "}
            {
              result.test_cases?.length
            }
          </p>

          <br />

          <h3
            style={{
              textAlign: "center"
            }}
          >
            Generated Test Cases
          </h3>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              marginTop: "15px"
            }}
          >

            <thead>

              <tr
                style={{
                  background:
                    "#1e293b",
                  color:
                    "white"
                }}
              >

                <th
                  style={{
                    padding:
                      "10px"
                  }}
                >
                  TC ID
                </th>

                <th
                  style={{
                    padding:
                      "10px"
                  }}
                >
                  Module
                </th>

                <th
                  style={{
                    padding:
                      "10px"
                  }}
                >
                  Feature
                </th>

                <th
                  style={{
                    padding:
                      "10px"
                  }}
                >
                  Title
                </th>

                <th
                  style={{
                    padding:
                      "10px"
                  }}
                >
                  Priority
                </th>

                <th
                  style={{
                    padding:
                      "10px"
                  }}
                >
                  Severity
                </th>

              </tr>

            </thead>

            <tbody>

              {result.test_cases?.map(
                (tc, index) => (

                  <tr
                    key={index}
                  >

                    <td
                      style={{
                        padding:
                          "10px",
                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >
                      {tc.tc_id}
                    </td>

                    <td
                      style={{
                        padding:
                          "10px",
                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >
                      {tc.module}
                    </td>

                    <td
                      style={{
                        padding:
                          "10px",
                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >
                      {tc.feature}
                    </td>

                    <td
                      style={{
                        padding:
                          "10px",
                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >
                      {tc.test_case_title}
                    </td>

                    <td
                      style={{
                        padding:
                          "10px",
                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >
                      {tc.priority}
                    </td>

                    <td
                      style={{
                        padding:
                          "10px",
                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >
                      {tc.severity}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );
}

export default UploadPdf;