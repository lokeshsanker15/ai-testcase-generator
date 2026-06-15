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
          "repeat(3,1fr)",

        gap: "20px",

        margin: "20px"
      }}
    >

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

    </div>
  );
}

export default DashboardCards;