from embedding_service import generate_embedding

result = generate_embedding(
    "Verify successful login"
)

print(len(result))
print(result[:5])