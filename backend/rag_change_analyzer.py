import os
import json
import google.generativeai as genai

from dotenv import load_dotenv

from rag_retriever import (
    retrieve_relevant_test_cases
)

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def rag_analyze_change(
    change_request
):

    retrieved_cases = (
        retrieve_relevant_test_cases(
            change_request
        )
    )

    prompt = f"""
You are a Senior QA Architect.

Analyze the change request using ONLY the retrieved test cases.

Return ONLY valid JSON.

IMPORTANT RULES:

1. If a change affects an existing module,
   impacted_test_cases MUST NOT be empty.

2. If existing test cases are retrieved from ChromaDB,
   modified_test_cases MUST NOT be empty.

3. For biometric authentication added to login:

   - Existing login test cases become impacted.

   - Existing login test cases must appear
     in modified_test_cases.

   - New biometric scenarios go into
     new_test_cases.

4. Always return:

   - At least 3 impacted test cases

   - At least 3 modified test cases

   whenever relevant test cases exist.

5. Use metadata from retrieved test cases.

6. Never leave metadata empty.

7. Generate realistic updated_steps.

8. Generate realistic updated_expected_result.

9. Existing login test cases should be modified
   to support biometric authentication.

10. Do NOT leave impacted_test_cases empty
    when login functionality is affected.

11. Do NOT leave modified_test_cases empty
    when login functionality is affected.

Required JSON Format:

{{
    "impacted_test_cases": [
        {{
            "tc_id": "LOGIN_TC_001",
            "reason": "Why impacted"
        }}
    ],

    "modified_test_cases": [
        {{
            "tc_id": "LOGIN_TC_001",

            "metadata": {{
                "module": "Authentication",
                "feature": "Login Functionality",
                "title": "Updated test case title",
                "priority": "High",
                "severity": "Critical"
            }},

            "updated_steps": [
                "Step 1",
                "Step 2"
            ],

            "updated_expected_result":
            "Expected result after change"
        }}
    ],

    "new_test_cases": [
        {{
            "tc_id": "BIO_TC_001",

            "metadata": {{
                "module": "Authentication",
                "feature": "Biometric Login",
                "title": "Verify biometric login",
                "priority": "High",
                "severity": "Critical"
            }}
        }}
    ],

    "coverage_gaps": [
        "Gap 1",
        "Gap 2"
    ]
}}

Retrieved Test Cases:

{json.dumps(retrieved_cases, indent=2)}

Change Request:

{change_request}
"""

    response = model.generate_content(
        prompt
    )

    clean_text = response.text.strip()

    if clean_text.startswith(
        "```json"
    ):

        clean_text = (
            clean_text
            .replace(
                "```json",
                ""
            )
            .replace(
                "```",
                ""
            )
            .strip()
        )

    print(
        "\n========== GEMINI RESPONSE ==========\n"
    )

    print(
        clean_text
    )

    print(
        "\n=====================================\n"
    )

    try:

        return json.loads(
            clean_text
        )

    except Exception as e:

        print(
            "JSON Parsing Error:",
            e
        )

        return {
            "impacted_test_cases": [],
            "modified_test_cases": [],
            "new_test_cases": [],
            "coverage_gaps": [
                "Failed to parse Gemini response"
            ]
        }