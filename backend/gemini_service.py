import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_test_cases(requirement):

    prompt = f"""
You are a Senior QA Test Engineer.

Analyze the requirement and generate comprehensive functional test cases.

Return ONLY valid JSON.

Output format:

[
  {{
    "tc_id": "",
    "module": "",
    "feature": "",
    "test_case_title": "",
    "pre_conditions": "",
    "test_steps": [],
    "test_data": "",
    "expected_result": "",
    "actual_result": "Not Executed",
    "execution_status": "Not Tested",
    "priority": "",
    "severity": "",
    "tester": "",
    "remarks": ""
  }}
]

Rules:

1. Return only JSON.
2. Do not return markdown.
3. Do not return explanations.
4. Generate positive test cases.
5. Generate negative test cases.
6. Generate boundary test cases when applicable.
7. Generate validation test cases.
8. Generate UI verification test cases.
9. Generate realistic test data.
10. Generate unique TC IDs.
11. Set priority as High, Medium, or Low.
12. Set severity as Critical, Major, or Minor.
13. actual_result must always be "Not Executed".
14. execution_status must always be "Not Tested".
15. tester must be empty.
16. remarks must be empty.

Requirement:

{requirement}
"""

    try:

        response = model.generate_content(
            prompt
        )

        clean_text = response.text.strip()

        if clean_text.startswith("```json"):

            clean_text = (
                clean_text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        return json.loads(
            clean_text
        )

    except Exception as e:

        print(
            "GEMINI ERROR:",
            str(e)
        )

        return [
            {
                "error":
                str(e)
            }
        ]