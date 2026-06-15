import chromadb

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="test_cases"
)


def clear_collection():

    global collection

    try:
        client.delete_collection(
            name="test_cases"
        )
    except:
        pass

    collection = client.get_or_create_collection(
        name="test_cases"
    )


def store_test_case(
    tc_id,
    text,
    embedding,
    metadata=None
):

    collection.add(
        ids=[str(tc_id)],
        documents=[text],
        embeddings=[embedding],
        metadatas=[metadata or {}]
    )


def search_similar(
    query_embedding,
    top_k=5
):

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results