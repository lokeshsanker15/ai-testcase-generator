import pandas as pd


def read_excel_file(file_path):

    try:

        df = pd.read_excel(file_path)

        test_cases = []

        for _, row in df.iterrows():

            test_case = {
                "tc_id": str(row.get("TC ID", "")),
                "module": str(row.get("Module", "")),
                "feature": str(row.get("Feature", "")),
                "test_case_title": str(row.get("Test Case Title", "")),
                "pre_conditions": str(row.get("Pre-Conditions", "")),
                "test_steps": str(row.get("Test Steps", "")),
                "test_data": str(row.get("Test Data", "")),
                "expected_result": str(row.get("Expected Result", "")),
                "actual_result": str(row.get("Actual Result", "")),
                "status": str(row.get("Status", "")),
                "priority": str(row.get("Priority", "")),
                "severity": str(row.get("Severity", "")),
                "tester": str(row.get("Tester", "")),
                "remarks": str(row.get("Remarks", ""))
            }

            test_cases.append(test_case)

        return test_cases

    except Exception as e:

        return {
            "error": str(e)
        }