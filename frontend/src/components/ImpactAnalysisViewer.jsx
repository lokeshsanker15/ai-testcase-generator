import { useState } from "react";
import API from "../services/api";

function ImpactAnalysisViewer({ result }) {

  const [activeTab, setActiveTab] =
    useState("impacted");

  if (!result) {
    return null;
  }

  const data =
    result.impact_analysis
      ? result.impact_analysis
      : result;

  const downloadReport =
    async () => {

      try {

        const response =
          await API.post(
            "/export-impact-analysis"
          );

        console.log(
          response.data
        );

        alert(
          "Report Generated Successfully!\n\nSaved to:\n" +
          response.data.file_path
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Report Generation Failed"
        );
      }
    };

  const tabStyle = (tab) => ({
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor:
      activeTab === tab
        ? "#1e293b"
        : "#e5e7eb",
    color:
      activeTab === tab
        ? "white"
        : "black",
    fontWeight: "bold"
  });

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
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
        Impact Analysis Results
      </h2>

      <div
        style={{
          textAlign: "right",
          marginBottom: "20px"
        }}
      >
        <button
          onClick={
            downloadReport
          }
          style={{
            backgroundColor:
              "#16a34a",
            color: "white",
            padding:
              "10px 20px",
            border: "none",
            borderRadius:
              "5px",
            cursor: "pointer",
            fontWeight:
              "bold"
          }}
        >
          Download Report
        </button>
      </div>

      {/* Tabs */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <button
          style={tabStyle(
            "impacted"
          )}
          onClick={() =>
            setActiveTab(
              "impacted"
            )
          }
        >
          Impacted (
          {
            data
              .impacted_test_cases
              ?.length || 0
          }
          )
        </button>

        <button
          style={tabStyle(
            "modified"
          )}
          onClick={() =>
            setActiveTab(
              "modified"
            )
          }
        >
          Modified (
          {
            data
              .modified_test_cases
              ?.length || 0
          }
          )
        </button>

        <button
          style={tabStyle(
            "new"
          )}
          onClick={() =>
            setActiveTab(
              "new"
            )
          }
        >
          New (
          {
            data
              .new_test_cases
              ?.length || 0
          }
          )
        </button>

        <button
          style={tabStyle(
            "coverage"
          )}
          onClick={() =>
            setActiveTab(
              "coverage"
            )
          }
        >
          Coverage (
          {
            data
              .coverage_gaps
              ?.length || 0
          }
          )
        </button>
      </div>

      {/* Impacted */}

      {activeTab ===
        "impacted" && (

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
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
                Reason
              </th>
            </tr>
          </thead>

          <tbody>

            {(data
              .impacted_test_cases ||
              [])
              .map(
                (
                  tc,
                  index
                ) => (

                <tr
                  key={index}
                >
                  <td>
                    {
                      typeof tc ===
                      "string"
                        ? tc
                        : tc.tc_id
                    }
                  </td>

                  <td>
                    {
                      tc.reason ||
                      tc.why_impacted ||
                      tc.explanation ||
                      data.explanation_of_impact ||
                      "Impacted by change"
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Modified */}

      {activeTab ===
        "modified" && (

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
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
              <th>
                TC ID
              </th>

              <th>
                Module
              </th>

              <th>
                Feature
              </th>

              <th>
                Title
              </th>
            </tr>
          </thead>

          <tbody>

            {(data
              .modified_test_cases ||
              [])
              .map(
                (
                  tc,
                  index
                ) => (

                <tr
                  key={index}
                >
                  <td>
                    {
                      tc.tc_id
                    }
                  </td>

                  <td>
                    {
                      tc.metadata
                        ?.module
                    }
                  </td>

                  <td>
                    {
                      tc.metadata
                        ?.feature
                    }
                  </td>

                  <td>
                    {
                      tc.metadata
                        ?.title
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* New */}

      {activeTab ===
        "new" && (

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
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
              <th>
                TC ID
              </th>

              <th>
                Module
              </th>

              <th>
                Feature
              </th>

              <th>
                Title
              </th>
            </tr>
          </thead>

          <tbody>

            {(data
              .new_test_cases ||
              [])
              .map(
                (
                  tc,
                  index
                ) => (

                <tr
                  key={index}
                >
                  <td>
                    {
                      tc.tc_id
                    }
                  </td>

                  <td>
                    {
                      tc.metadata
                        ?.module
                    }
                  </td>

                  <td>
                    {
                      tc.metadata
                        ?.feature
                    }
                  </td>

                  <td>
                    {
                      tc.metadata
                        ?.title
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Coverage */}

      {activeTab ===
        "coverage" && (

        <ul>
          {(data
            .coverage_gaps ||
            [])
            .map(
              (
                gap,
                index
              ) => (

              <li
                key={index}
                style={{
                  marginBottom:
                    "10px"
                }}
              >
                {gap}
              </li>
            ))}
        </ul>
      )}

    </div>
  );
}

export default ImpactAnalysisViewer;