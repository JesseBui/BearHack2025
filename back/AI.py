import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('API_KEY')
url = "https://api.perplexity.ai/chat/completions"

payload = {
    "model": "sonar",
    "messages": [
        {"role": "user", "content": "What is the latest news in AI research?"}
    ],
    "max_tokens": 200
}
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"                           
}

response = requests.post(url, json=payload, headers=headers)
response_json = response.json()

# Extract and print the 'content' part
content = response_json["choices"][0]["message"]["content"]
print(content)