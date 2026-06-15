from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import FileResponse

from gemini_service import generate_test_cases
from excel_exporter import export_test_cases_to_excel
from excel_reader import read_excel_file

from impact_excel_exporter_v3 import (
    export_impact_analysis_v3
)

from embedding_service import (
    generate_embedding
)

from chroma_service import (
    store_test_case,
    clear_collection
)

from rag_change_analyzer import (
    rag_analyze_change
)

import os

app = FastAPI(
    title="AI Test Case Generator",
    description="AI Test Case Generator + RAG",
    version="5.0"
)

# ----------------------------------------
# CORS Configuration
# ----------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------
# Create Required Folders
# ----------------------------------------
os.makedirs(
    "uploads",
    exist_ok=True
)

os.makedirs(
    "output",
    exist_ok=True
)

# ----------------------------------------
# Global Variables
# ----------------------------------------
uploaded_test_cases = []

last_analysis_result = {}


# ----------------------------------------
# Request Models
# ----------------------------------------
class RequirementRequest(
    BaseModel
):
    requirement: str


class ChangeRequest(
    BaseModel
):
    change_request: str


# ----------------------------------------
# Home API
# ----------------------------------------
@app.get("/")
def home():

    return {
        "message":
        "AI Test Case Generator + RAG Running"
    }


# ----------------------------------------
# Generate Test Cases
# ----------------------------------------
@app.post("/generate-testcases")
def generate_testcases(
    req: RequirementRequest
):

    test_cases = (
        generate_test_cases(
            req.requirement
        )
    )

    return test_cases


# ----------------------------------------
# Generate Excel
# ----------------------------------------
@app.post("/generate-excel")
def generate_excel(
    req: RequirementRequest
):

    test_cases = (
        generate_test_cases(
            req.requirement
        )
    )

    file_path = (
        export_test_cases_to_excel(
            test_cases
        )
    )

    return {
        "message":
            "Excel generated successfully",

        "file_path":
            file_path,

        "total_test_cases":
            len(test_cases)
    }


# ----------------------------------------
# Upload Excel
# Store In ChromaDB
# ----------------------------------------
@app.post("/upload-excel")
async def upload_excel(
    file: UploadFile = File(...)
):

    global uploaded_test_cases

    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    uploaded_test_cases = (
        read_excel_file(
            file_path
        )
    )

    clear_collection()

    stored_count = 0

    for tc in uploaded_test_cases:

        text = f"""
        Module:
        {tc.get('module','')}

        Feature:
        {tc.get('feature','')}

        Test Case Title:
        {tc.get('test_case_title','')}

        Preconditions:
        {tc.get('pre_conditions','')}

        Test Steps:
        {tc.get('test_steps','')}

        Test Data:
        {tc.get('test_data','')}

        Expected Result:
        {tc.get('expected_result','')}

        Priority:
        {tc.get('priority','')}

        Severity:
        {tc.get('severity','')}
        """

        metadata = {

            "tc_id":
                str(
                    tc.get(
                        "tc_id",
                        ""
                    )
                ),

            "module":
                str(
                    tc.get(
                        "module",
                        ""
                    )
                ),

            "feature":
                str(
                    tc.get(
                        "feature",
                        ""
                    )
                ),

            "title":
                str(
                    tc.get(
                        "test_case_title",
                        ""
                    )
                ),

            "priority":
                str(
                    tc.get(
                        "priority",
                        ""
                    )
                ),

            "severity":
                str(
                    tc.get(
                        "severity",
                        ""
                    )
                )
        }

        embedding = (
            generate_embedding(
                text
            )
        )

        store_test_case(
            tc.get(
                "tc_id"
            ),
            text,
            embedding,
            metadata
        )

        stored_count += 1

    return {

        "message":
            "Excel uploaded successfully",

        "file_name":
            file.filename,

        "total_test_cases":
            len(
                uploaded_test_cases
            ),

        "stored_in_vectordb":
            stored_count
    }


# ----------------------------------------
# RAG Change Analysis
# ----------------------------------------
@app.post("/analyze-change")
def analyze(
    req: ChangeRequest
):

    global last_analysis_result

    last_analysis_result = (
        rag_analyze_change(
            req.change_request
        )
    )

    return (
        last_analysis_result
    )


# ----------------------------------------
# Export Professional Impact Report
# ----------------------------------------
@app.get(
    "/export-impact-analysis"
)
def export_analysis():

    global last_analysis_result

    if not last_analysis_result:

        return {
            "error":
            "Please run change analysis first"
        }

    file_path = (
        export_impact_analysis_v3(
            last_analysis_result
        )
    )

    return FileResponse(
        path=file_path,
        filename="impact_analysis_report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )