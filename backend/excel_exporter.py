import pandas as pd
import os


def export_test_cases_to_excel(test_cases):

    excel_data = []

    for tc in test_cases:

        excel_data.append({
            "TC ID": tc.get("tc_id", ""),
            "Module": tc.get("module", ""),
            "Feature": tc.get("feature", ""),
            "Test Case Title": tc.get("test_case_title", ""),
            "Pre-Conditions": tc.get("pre_conditions", ""),
            "Test Steps": "\n".join(tc.get("test_steps", [])),
            "Test Data": tc.get("test_data", ""),
            "Expected Result": tc.get("expected_result", ""),
            "Actual Result": "Not Executed",
            "Status": "Not Tested",
            "Priority": tc.get("priority", ""),
            "Severity": tc.get("severity", ""),
            "Tester": "",
            "Remarks": ""
        })

    df = pd.DataFrame(excel_data)

    output_folder = "output"
    os.makedirs(output_folder, exist_ok=True)

    file_path = os.path.join(
        output_folder,
        "generated_testcases.xlsx"
    )

    with pd.ExcelWriter(
        file_path,
        engine="openpyxl"
    ) as writer:

        df.to_excel(
            writer,
            sheet_name="Functional Test Cases",
            index=False
        )

        worksheet = writer.sheets["Functional Test Cases"]

        for column in worksheet.columns:
            max_length = 0
            column_letter = column[0].column_letter

            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass

            adjusted_width = min(max_length + 5, 50)
            worksheet.column_dimensions[column_letter].width = adjusted_width

    return file_path