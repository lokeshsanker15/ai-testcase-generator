from embedding_service import (
    generate_embedding
)

from chroma_service import (
    search_similar
)


def retrieve_relevant_test_cases(
    change_request
):

    query_embedding = (
        generate_embedding(
            change_request
        )
    )

    results = search_similar(
        query_embedding,
        top_k=5
    )

    retrieved = []

    ids = results["ids"][0]
    docs = results["documents"][0]
    distances = results["distances"][0]

    metadatas = (
        results.get(
            "metadatas",
            [[]]
        )[0]
    )

    for i in range(
        len(ids)
    ):

        retrieved.append(
            {
                "tc_id":
                    ids[i],

                "metadata":
                    metadatas[i],

                "document":
                    docs[i],

                "distance":
                    distances[i]
            }
        )

    return retrieved