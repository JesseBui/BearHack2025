from pytickersymbols import PyTickerSymbols
from flask import Flask, request, jsonify

stock_data = PyTickerSymbols()
SP500 = stock_data.get_stocks_by_index('S&P 500')  # Corrected index name

asset_list = []
for stock in SP500:
    asset_list.append(stock['symbol'])

app = Flask(__name__)

@app.get("/getAllCompanies")
def getAllCompanies():
    return jsonify(asset_list)

if __name__ == "__main__":
    app.run()