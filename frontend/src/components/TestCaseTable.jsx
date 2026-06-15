function TestCaseTable({ testCases }) {

  if (!testCases || testCases.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "30px"
      }}
    >
      <h2>
        Generated Test Cases
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#1e293b",
              color: "white"
            }}
          >
            <th>TC ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Severity</th>
          </tr>
        </thead>

        <tbody>

          {testCases.map((tc) => (

            <tr key={tc.tc_id}>

              <td>{tc.tc_id}</td>

              <td>
                {tc.test_case_title}
              </td>

              <td>
                {tc.priority}
              </td>

              <td>
                {tc.severity}
              </td>

            </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
}

export default TestCaseTable;