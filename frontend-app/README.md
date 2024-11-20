# Example frontend app

Uses following docker images:
- deep_dive_database
- deep_dive_api

Uses Ollama application for its local AI capability
https://ollama.com/

## some extra info

The Ollama application needs to be serving the api:
```bash
ollama serve
```

If it is running you can prompt it through the api:
```bash
curl http://localhost:11434/api/generate -d '{                   
  "model": "llama3.2",
  "prompt": "What is 1 + 1",       
  "stream": false
}'
```

The response might take a long time to arrive, depending on the size of the response