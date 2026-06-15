from embedding_service import generate_embedding
from chroma_service import (
    store_test_case,
    search_similar
)

store_test_case(
    "TC001",
    "Verify successful login",
    generate_embedding(
        "Verify successful login"
    )
)

store_test_case(
    "TC002",
    "Verify forgot password",
    generate_embedding(
        "Verify forgot password"
    )
)

store_test_case(
    "TC003",
    "Verify OTP authentication",
    generate_embedding(
        "Verify OTP authentication"
    )
)

results = search_similar(
    generate_embedding(
        "Add biometric login"
    )
)

print(results)