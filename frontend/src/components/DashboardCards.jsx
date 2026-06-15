function DashboardCards({
  setActiveModule
}) {

  const cardStyle = {

    background: "#ffffff",

    borderRadius: "10px",

    padding: "20px",

    boxShadow:
      "0px 2px 8px rgba(0,0,0,0.1)",

    textAlign: "center",

    cursor: "pointer",

    minHeight: "120px",

    transition: "0.3s"
  };

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(4,1fr)",

        gap: "20px",

        margin: "20px"
      }}
    >

      {/* Generate Test Cases */}

      <div
        style={cardStyle}
        onClick={() =>
          setActiveModule(
            "generate"
          )
        }
      >
        <h3>
          Generate Test Cases
        </h3>

        <p>
          Create test cases using AI
        </p>
      </div>

      {/* Upload Excel */}

      <div
        style={cardStyle}
        onClick={() =>
          setActiveModule(
            "upload"
          )
        }
      >
        <h3>
          Upload Excel
        </h3>

        <p>
          Upload existing test cases
        </p>
      </div>

      {/* Analyze Change */}

      <div
        style={cardStyle}
        onClick={() =>
          setActiveModule(
            "analyze"
          )
        }
      >
        <h3>
          Analyze Change
        </h3>

        <p>
          Perform impact analysis
        </p>
      </div>

      {/* Upload PDF */}

      <div
        style={cardStyle}
        onClick={() =>
          setActiveModule(
            "pdf"
          )
        }
      >
        <h3>
          Upload PDF
        </h3>

        <p>
          Generate test cases from PDF requirements
        </p>
      </div>

    </div>
  );
}

export default DashboardCards;