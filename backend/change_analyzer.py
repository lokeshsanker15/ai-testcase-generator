import os
import json
import google.generativeai as genai

from dotenv import load_dotenv
from rag_retriever import retrieve_relevant_test_cases

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def analyze_change(existing_test_cases, change_request):

    relevant_cases = retrieve_relevant_test_cases(
        change_request
    )

    prompt = f"""
You are a Senior QA Test Architect.

You are given:

1. Relevant Existing Functional Test Cases
2. A New Change Request

Your job is to perform Requirement Change Impact Analysis.

Tasks:

1. Analyze the change request.
2. Identify impacted test cases.
3. Explain why they are impacted.
4. Modify impacted test cases.
5. Generate any new required test cases.
6. Identify missing test coverage.
7. Preserve the original test case structure.
8. Return ONLY valid JSON.

Output Format:

{{
  "change_summary": "",

  "impacted_test_cases": [
    {{
      "tc_id": "",
      "reason": ""
    }}
  ],

  "modified_test_cases": [
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
  ],

  "new_test_cases": [
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
  ],

  "coverage_gaps": [
    ""
  ]
}}

Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanations outside JSON.
- Generate realistic enterprise QA test cases.
- Keep impacted test cases traceable.
- Use the relevant test cases provided below.
- Generate modifications only where needed.

Relevant Test Cases From Vector Database:

{json.dumps(relevant_cases, indent=2)}

Change Request:

{change_request}
"""

    response = model.generate_content(
        prompt
    )

    clean_text = response.text.strip()

    if clean_text.startswith("```json"):
        clean_text = clean_text.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

    return json.loads(
        clean_text
    )