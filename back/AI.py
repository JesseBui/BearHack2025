import requests
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
import random
load_dotenv()

with open('stocklist.txt', 'r') as file:
    data = file.read().rstrip()


sad_variants = [
    "I'm feeling very down today. Can you suggest some safe stocks?",
    "I'm not in the mood for risks. What are some stable investment options?",
    "I'm sad and need something secure to invest in.",
    "Go easy on me — I need low-risk stock recommendations.",
    "I'm feeling low. Give me the safest trades you can.",
    "I'm emotionally drained — show me the most stable stocks.",
    "Let's play it safe. I'm not ready for anything risky.",
    "I'm in a bad place right now. Only safe stock picks, please.",
    "Suggest the calmest, most reliable investments today.",
    "I'm not feeling great. I want something safe and steady.",
    "I'd prefer low-risk stocks. I'm feeling down.",
    "Recommend stocks that won't stress me out — I'm not okay.",
    "My mood's not the best. Let's stick to conservative picks.",
    "I'm going through a rough patch. What are some secure investments?",
    "I'm feeling fragile. Please recommend only very safe stocks."
]

API_KEY = os.getenv('PPLX_API_KEY')
url = "https://api.perplexity.ai/chat/completions"
memory = []
payload = {
    "model": "sonar-pro",
    "messages": [
        {
            "role": "system",
            "content": f"""You are an expert in stock analysis. Below is a list of stocks:
            {data}
            If the user says they are 'Happy', suggest a riskier trade.
            If they say they are 'Cautious', suggest a safer trade.
            Only provide stock suggestions—no extra commentary."""
        },
        {"role": "user", 
         "content": random.choice(sad_variants)
        }
    ],
    "max_tokens": 10000,
    "temperature": 1.0,
    "top_p": 0.9
}
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"                           
}
response = requests.post(url, json=payload, headers=headers)
response_json = response.json()

# Extract and print the 'content' part
app = Flask(__name__)

content = response_json["choices"][0]["message"]["content"]
print(content)

@app.route("/", methods=["GET"])
def getAllCompanies():
    return content

if __name__ == "__main__":
    app.run()
# print (len(data.split()) // 0.75)

