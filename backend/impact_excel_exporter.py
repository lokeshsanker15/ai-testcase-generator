import pandas as pd
import os


def export_impact_analysis(result):

    output_folder = "output"

    os.makedirs(
        output_folder,
        exist_ok=True
    )

    file_path = os.path.join(
        output_folder,
        "impact_analysis_report.xlsx"
    )

    with pd.ExcelWriter(
        file_path,
        engine="openpyxl"
    ) as writer:

        # ----------------------------
        # Sheet 1 - Change Summary
        # ----------------------------

        summary_df = pd.DataFrame([
            {
                "Change Summary":
                result.get(
                    "change_summary",
                    ""
                )
            }
        ])

        summary_df.to_excel(
            writer,
            sheet_name="Change Summary",
            index=False
        )

        # ----------------------------
        # Sheet 2 - Impacted Cases
        # ----------------------------

        impacted_df = pd.DataFrame(
            result.get(
                "impacted_test_cases",
                []
            )
        )

        impacted_df.to_excel(
            writer,
            sheet_name="Impacted Cases",
            index=False
        )

        # ----------------------------
        # Sheet 3 - Modified Cases
        # ----------------------------

        modified_df = pd.DataFrame(
            result.get(
                "modified_test_cases",
                []
            )
        )

        modified_df.to_excel(
            writer,
            sheet_name="Modified Cases",
            index=False
        )

        # ----------------------------
        # Sheet 4 - New Cases
        # ----------------------------

        new_df = pd.DataFrame(
            result.get(
                "new_test_cases",
                []
            )
        )

        new_df.to_excel(
            writer,
            sheet_name="New Test Cases",
            index=False
        )

        # ----------------------------
        # Sheet 5 - Coverage Gaps
        # ----------------------------

        coverage_df = pd.DataFrame({
            "Coverage Gaps":
            result.get(
                "coverage_gaps",
                []
            )
        })

        coverage_df.to_excel(
            writer,
            sheet_name="Coverage Gaps",
            index=False
        )

        # ----------------------------
        # Auto Resize Columns
        # ----------------------------

        for sheet in writer.sheets.values():

            for column in sheet.columns:

                max_length = 0

                column_letter = (
                    column[0]
                    .column_letter
                )

                for cell in column:

                    try:

                        if len(
                            str(cell.value)
                        ) > max_length:

                            max_length = len(
                                str(cell.value)
                            )

                    except:

                        pass

                sheet.column_dimensions[
                    column_letter
                ].width = min(
                    max_length + 5,
                    60
                )

    return file_path