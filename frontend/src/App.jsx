import { useState } from "react";

import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import GenerateTestCases from "./components/GenerateTestCases";
import UploadExcel from "./components/UploadExcel";
import ChangeAnalysis from "./components/ChangeAnalysis";

function App() {
  const [activeModule, setActiveModule] =
    useState("generate");

  return (
    <div>
      <Header />

      <DashboardCards
        setActiveModule={
          setActiveModule
        }
      />

      {activeModule ===
        "generate" && (
        <GenerateTestCases />
      )}

      {activeModule ===
        "upload" && (
        <UploadExcel />
      )}

      {activeModule ===
        "analyze" && (
        <ChangeAnalysis />
      )}
    </div>
  );
}

export default App;