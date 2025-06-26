from sentence_transformers import SentenceTransformer
sentences = ["Test 123", "dsadsawfwgre"]

model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-mpnet-base-v2')
embeddings = model.encode(sentences)
print(embeddings)
