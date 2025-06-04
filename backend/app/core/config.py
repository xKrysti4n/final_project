INDEX_NAME = "job_dataset"



synonyms_list = [
    "dev, developer, programista, software engineer, inżynier oprogramowania",
    "mgr, magister, master",
    "junior, początkujący",
    "senior, doświadczony",
    "lead, team lead, lider zespołu",
    "hr, human resources, kadry",
    "qa, quality assurance, tester, testowanie",
    "pm, project manager, kierownik projektu",
    "admin, administrator, sysadmin, system administrator",
    "cto, chief technology officer, dyrektor techniczny",
    "it, information technology, informatyka",
    "analityk, analyst, data analyst, analityk danych",
    "sales, sprzedawca, handlowiec",
    "marketing, marketingowiec, specjalista ds. marketingu",
    "support, wsparcie techniczne, helpdesk",
    "fullstack, full stack developer, programista fullstack",
    "backend, back-end developer, programista backendu",
    "frontend, front-end developer, programista frontend"
]

ANALYZER = {
    "settings": {
        "analysis":{
            "filter":{
                "polish_stop_words":{
                    "type": "stop",
                    "stopwords": "_polish_"
                },
                "edge_ngram":
                {
                    "type":"edge_ngram",
                    "min_gram": 2,
                    "max_gram": 10
                },
                "synonyms_filter":{
                    "type": "synonym",
                    "synonyms": synonyms_list
                }
            },
            "analyzer":{
                "job_analyzer":{
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "polish_stop_words",
                        "synonyms_filter",
                        "edge_ngram",
                        "asciifolding"
                    ]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "job_title": {
                "type": "text",
                "analyzer": "job_analyzer",
                "search_analyzer": "job_analyzer"
            },
            "url":{
                "type": "keyword"
            },
            "posted_date":{
                "type": "date",
                "format": "yyyy-MM-dd"
            },
            "job_location":{
                "type": "text",
                "analyzer": "standard",
                "fields": {
                    "keyword": {
                        "type": "keyword"
                    }
                }
            },
            "job_description":{
                "type": "text",
                "analyzer" : "job_analyzer",
                "search_analyzer": "job_analyzer"
            },
            "company_name": {
                "type": "keyword"
            },
            "company_url":{
                "type": "keyword",
                "index": False
            },
            "company_industry":{
                "type": "keyword"
            },
            "company_description":{
                "type": "text",
                "analyzer" : "job_analyzer",
                "search_analyzer": "job_analyzer"
            },
            "is_remote" :{
                "type": "boolean"
            },
            "job_id":{
                "type": "keyword"
            },
            "owner_key": {
                "type": "keyword"
            },
            "voivodeship":{
                "type": "keyword"
            },
            "job_description_embedding":{
                "type": "dense_vector",
                "dims": 768,
                "index": True,
                "similarity": "cosine"
            }
        }
    }
}
