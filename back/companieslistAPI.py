def get_stock_value(stock_info, key, default="N/A"):
    return stock_info.get(key, default)

from pytickersymbols import PyTickerSymbols
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import yfinance as yf
import os
import json

load_dotenv()

CMC_API_KEY = os.getenv('CMC_API_KEY')

stock_data = PyTickerSymbols()
SP100 = stock_data.get_stocks_by_index('S&P 100')

# stock list

asset_list = {}
crypto_list = []

if os.path.exists("stocklist.txt") and os.path.getsize("stocklist.txt") > 0:
    with open("stocklist.txt", 'r', encoding='utf-8') as fopen:
        try:
            asset_list = json.load(fopen)  # Load existing data into asset_list
            print("Loaded existing stock data from stocklist.txt.")
        except json.JSONDecodeError:
            print("Error: stocklist.txt is not a valid JSON file. Starting fresh.")
            asset_list = {}  # Reset if file is corrupted
else:
    asset_list = {}

if not asset_list:
    for stock in SP100:
        symbol = stock.get('symbol')

        if not symbol:
            print(f"Skipping stock with missing symbol: {stock}")
            continue

        try:
            dat = yf.Ticker(symbol)
            stock_info = dat.info

            if stock_info:  # Ensure data is valid


                asset_list[symbol] = {
                    "Stock Market Data": {
                        "Current Price": get_stock_value(stock_info, "currentPrice", "N/A"),
                        "52-Week Range": f"{get_stock_value(stock_info, 'fiftyTwoWeekLow', 'N/A')} - {get_stock_value(stock_info, 'fiftyTwoWeekHigh', 'N/A')}",
                        "50-Day Average": get_stock_value(stock_info, "fiftyDayAverage", "N/A"),
                        "200-Day Average": get_stock_value(stock_info, "twoHundredDayAverage", "N/A"),
                        "Beta": get_stock_value(stock_info, "beta", "N/A"),
                        "Dividend Yield": f"{get_stock_value(stock_info, 'dividendYield', 0) * 100:.2f}%" if stock_info.get("dividendYield") else "N/A",
                        "Dividend Rate": f"${get_stock_value(stock_info, 'dividendRate', 'N/A')}",
                        "Payout Ratio": f"{get_stock_value(stock_info, 'payoutRatio', 0) * 100:.2f}%" if stock_info.get("payoutRatio") else "N/A",
                    },
                    "Analyst Ratings & Stock Performance": {
                        "Target Price Range": f"{get_stock_value(stock_info, 'targetLowPrice', 'N/A')} - {get_stock_value(stock_info, 'targetHighPrice', 'N/A')}",
                        "Mean Target Price": get_stock_value(stock_info, "targetMeanPrice", "N/A"),
                        "Median Target Price": get_stock_value(stock_info, "targetMedianPrice", "N/A"),
                        "Analyst Recommendation": f"{get_stock_value(stock_info, 'recommendationMean', 'N/A')} (<1 = Strong Buy, >5 = Strong Sell)",
                    },
                    "Risk Factors": {
                        "Audit Risk": get_stock_value(stock_info, "auditRisk", "N/A"),  
                        "Board Risk": get_stock_value(stock_info, "boardRisk", "N/A"),
                        "Compensation Risk": get_stock_value(stock_info, "compensationRisk", "N/A"),
                        "Shareholder Rights Risk": get_stock_value(stock_info, "shareHolderRightsRisk", "N/A"),
                        "Overall Risk": get_stock_value(stock_info, "overallRisk", "N/A"),
                    }
                }

            else:
                print(f"Could not fetch data for {symbol}")

        except Exception as e:
            print(f"Error fetching {symbol}: {e}")

with open("stocklist.txt", 'w+', encoding='utf-8') as fopen:
    json.dump(asset_list, fopen, indent=4)

print(asset_list)
# crypto list

# from requests import Request, Session
# from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
# import json

# cmc_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
# parameters = {
#   'start':'1',
#   'limit':'5000',
#   'convert':'USD'
# }
# headers = {
#   'Accepts': 'application/json',
#   'X-CMC_PRO_API_KEY': CMC_API_KEY
# }
cmc_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
parameters = {
  'convert':'USD'
}
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': CMC_API_KEY
}

# session = Session()
# session.headers.update(headers)

# try:
#     response = session.get(cmc_url, params=parameters)
#     data = json.loads(response.text)
#     for i in range (0, 100):
#         crypto_list.append(data['data'][i]['symbol'])
# except (ConnectionError, Timeout, TooManyRedirects) as e:
#   print(e)

# #print(asset_list, '\n\n\n', crypto_list)

app = Flask(__name__)

@app.route("/getAllCompanies", methods=["GET"])
def getAllCompanies():
    return jsonify(asset_list)

@app.route("/getCompany/<symbol>", methods=["GET"])
def getCompany(symbol):
    company_data = asset_list.get(symbol.upper())  # Ensure symbol case consistency
    if company_data:
        return jsonify(company_data)
    else:
        return jsonify({"error": f"Company with symbol {symbol} not found."}), 404

if __name__ == "__main__":
    app.run(debug=True)

@app.get("/getTopCrypto")
def getTopCrypto():
    return jsonify(crypto_list)

if __name__ == "__main__":
    app.run()