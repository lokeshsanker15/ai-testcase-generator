import { useState } from "react";
import API from "../services/api";

function UploadExcel() {
  const [file, setFile] = useState(null);

  const [uploadResult, setUploadResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert(
        "Please select an Excel file"
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
          "/upload-excel",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setUploadResult(
        response.data
      );

      console.log(
        response.data
      );

    } catch (error) {
      console.error(error);

      alert(
        "Excel upload failed"
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
          "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>
        Upload Test Case Excel
      </h2>

      <p>
        Upload an existing Excel
        file and store test cases
        in ChromaDB.
      </p>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <button
        onClick={uploadFile}
        disabled={loading}
        style={{
          backgroundColor:
            "#1e293b",
          color: "white",
          padding:
            "12px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading
          ? "Uploading..."
          : "Upload Excel"}
      </button>

      {uploadResult && (
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h3>
            Upload Successful
          </h3>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background:
                  "#1e293b",
                color: "white",
                padding:
                  "20px",
                borderRadius:
                  "10px",
                minWidth:
                  "180px",
                textAlign:
                  "center",
              }}
            >
              <h3>
                Test Cases
              </h3>

              <h1>
                {
                  uploadResult.total_test_cases
                }
              </h1>
            </div>

            <div
              style={{
                background:
                  "#0f766e",
                color: "white",
                padding:
                  "20px",
                borderRadius:
                  "10px",
                minWidth:
                  "180px",
                textAlign:
                  "center",
              }}
            >
              <h3>
                Vector DB
              </h3>

              <h1>
                {
                  uploadResult.stored_in_vectordb
                }
              </h1>
            </div>
          </div>

          <br />

          <div
            style={{
              background:
                "#f8fafc",
              padding:
                "15px",
              borderRadius:
                "10px",
            }}
          >
            <strong>
              File:
            </strong>{" "}
            {
              uploadResult.file_name
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadExcel;