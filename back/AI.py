import requests
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
import random

load_dotenv()

with open('stocklist.txt', 'r') as file:
    data = file.read().rstrip()

sad_variants = [
    "I'm feeling down — give me 5 of the safest stocks to invest in.",
    "Go easy on me — I need 5 low-risk stock suggestions.",
    "I'm not up for risks — show me 5 stable stocks.",
    "I just want something steady — suggest 5 reliable stocks.",
    "I'm in a low mood — recommend 5 conservative stocks with minimal risk."
]

happy_variants = [
    "I'm feeling great — give me 5 risky stocks with big reward potential.",
    "Let's go bold today — show me 5 high-volatility stocks to consider.",
    "I'm in a YOLO mood — recommend 5 aggressive, high-risk stocks.",
    "Life's good — suggest 5 explosive stocks that could take off.",
    "Feeling lucky — give me 5 breakout-potential stocks to check out."
]

hopeful_variants = [
    "I'm feeling hopeful — recommend 5 balanced stocks with growth potential.",
    "I'm looking for moderate-risk stocks — what are 5 promising ones to consider?",
    "Let's go for growth — give me 5 steady, well-rounded stocks.",
    "I'm optimistic about the market — show me 5 stocks with room to rise.",
    "Things are looking up — suggest 5 balanced stocks for a hopeful outlook."
]


cautious_variants = [
    "I'm feeling cautious — recommend 5 low-risk stocks to consider.",
    "I'm looking for safe stocks only — give me 5 stable stock picks.",
    "Let's keep it conservative — suggest 5 reliable stocks to invest in.",
    "I want to invest carefully — show me 5 low-volatility stocks.",
    "I'm avoiding risk today — recommend 5 safe and steady stocks."
]

random_variants = [
    "Give me 5 random stocks — I don't care about the risk level.",
    "Pick any 5 random stocks from the list with no strategy.",
    "Roll the dice and recommend 5 completely random stocks.",
    "No logic today — just give me 5 random stocks to look at.",
    "I'm feeling unpredictable — show me 5 totally random stocks."
]




API_KEY = os.getenv('PPLX_API_KEY')
url = "https://api.perplexity.ai/chat/completions"
app = Flask(__name__)


memory = [
{
    "role": "system",
    "content": f"""You are an expert in stock analysis. Below is a list of stocks:
{data}

When the user provides a mood, suggest **exactly 5 stock picks** based on the following:

- 'Happy': 5 high-risk, high-reward stocks.
- 'Sad': 5 ultra-safe, low-volatility stocks.
- 'Cautious': 5 safe, stable stocks with a good track record.
- 'Hopeful': 5 balanced stocks with moderate risk and good growth potential.
- 'Random': select 5 completely random stocks from the list, no filtering.

Instructions:
- You MUST give exactly 5 stock picks.
- DO explain briefly why you chose each one.
- AVOID repeating stocks that were already suggested in earlier messages.
- Rotate your suggestions as if you're trying not to recommend the same stock too often.
- Stick to the list provided. Only talk about stocks.
"""
}

]

@app.route("/", methods=["GET"])
def getAllCompanies():
    # Pick a random message
    user_prompt = random.choice(sad_variants)

    # Add user prompt to memory
    memory.append({"role": "user", "content": user_prompt})

    # Prepare payload with memory
    payload = {
        "model": "sonar-pro",
        "messages": memory,
        "max_tokens": 12000,
        "temperature": 1.0,
        "top_p": 0.9
    }

    # Send request
    response = requests.post(url, json=payload, headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    })

    
    # placeholder = "Based on your request for low-risk stock suggestions, here are 5 options to consider:\n\n1. Johnson & Johnson (JNJ): This diversified healthcare company has a strong track record of stability and consistent dividend growth. With an overall risk factor of 6, it offers a balanced mix of pharmaceutical, medical device, and consumer health products[3].\n\n2. Procter & Gamble (PG): A consumer staples giant, P&G has an overall risk factor of 2, making it one of the safest stocks on the list. Its diverse portfolio of household brands provides steady cash flow and reliable dividends[3].\n\n3. Coca-Cola (KO): With an overall risk factor of 3, Coca-Cola is a defensive stock known for its strong brand and global presence. It offers a steady dividend and has shown resilience during economic downturns[3].\n\n4. Walmart (WMT): This retail behemoth has an overall risk factor of 2, indicating its stability. Walmart's business model tends to perform well even during economic uncertainties, making it a relatively safe investment[3].\n\n5. Verizon (VZ): With an overall risk factor of 2, Verizon is a telecommunications company that offers a high dividend yield and stable cash flows. Its essential services nature adds to its low-risk profile[3].\n\nThese stocks are generally considered low-risk due to their stable business models, strong market positions, and history of consistent performance. However, remember that all investments carry some level of risk, and it's important to diversify your portfolio and consult with a financial advisor before making investment decisions."
    

    # Parse response
    print(response.json())
    content = response_json["choices"][0]["message"]["content"]
    response_json = response.json()  # Extract only the message
    # Add assistant response to memory
    memory.append({"role": "assistant", "content": content})

    # return jsonify(placeholder.split("\n\n"))

    # Print and return
    return jsonify(response.json())
    # return content

if __name__ == "__main__":
    app.run()
