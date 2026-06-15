import pandas as pd
import os


def export_impact_analysis_v2(
    analysis_result
):

    os.makedirs(
        "output",
        exist_ok=True
    )

    file_path = (
        "output/impact_analysis_report.xlsx"
    )

    # Handle nested response
    if "impact_analysis" in analysis_result:

        data = analysis_result[
            "impact_analysis"
        ]

    else:

        data = analysis_result

    impacted = data.get(
        "impacted_test_cases",
        []
    )

    modified = data.get(
        "modified_test_cases",
        []
    )

    new_cases = data.get(
        "new_test_cases",
        []
    )

    coverage_gaps = data.get(
        "coverage_gaps",
        []
    )

    print("\n========== IMPACT REPORT DEBUG ==========")

    print(
        "Impacted:",
        len(impacted)
    )

    print(
        "Modified:",
        len(modified)
    )

    print(
        "New:",
        len(new_cases)
    )

    print(
        "Coverage:",
        len(coverage_gaps)
    )

    print("\n----- FIRST RECORD CHECK -----")

    if len(impacted) > 0:
        print(
            "\nFIRST IMPACTED:"
        )
        print(
            impacted[0]
        )

    if len(modified) > 0:
        print(
            "\nFIRST MODIFIED:"
        )
        print(
            modified[0]
        )

    if len(new_cases) > 0:
        print(
            "\nFIRST NEW:"
        )
        print(
            new_cases[0]
        )

    print(
        "\n==============================\n"
    )

    with pd.ExcelWriter(
        file_path,
        engine="openpyxl"
    ) as writer:

        # -----------------------
        # Impacted Test Cases
        # -----------------------

        impacted_df = pd.DataFrame(
            impacted
        )

        print(
            "\nImpacted DF Columns:"
        )

        print(
            impacted_df.columns
        )

        impacted_df.to_excel(
            writer,
            sheet_name=
            "Impacted_Test_Cases",
            index=False
        )

        # -----------------------
        # Modified Test Cases
        # -----------------------

        modified_df = pd.DataFrame(
            modified
        )

        print(
            "\nModified DF Columns:"
        )

        print(
            modified_df.columns
        )

        modified_df.to_excel(
            writer,
            sheet_name=
            "Modified_Test_Cases",
            index=False
        )

        # -----------------------
        # New Test Cases
        # -----------------------

        new_df = pd.DataFrame(
            new_cases
        )

        print(
            "\nNew DF Columns:"
        )

        print(
            new_df.columns
        )

        new_df.to_excel(
            writer,
            sheet_name=
            "New_Test_Cases",
            index=False
        )

        # -----------------------
        # Coverage Gaps
        # -----------------------

        gaps_df = pd.DataFrame(
            {
                "Coverage Gap":
                coverage_gaps
            }
        )

        gaps_df.to_excel(
            writer,
            sheet_name=
            "Coverage_Gaps",
            index=False
        )

    print(
        f"\nImpact Report Saved: {file_path}\n"
    )

    return file_path