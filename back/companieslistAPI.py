from pytickersymbols import PyTickerSymbols
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

load_dotenv()

CMC_API_KEY = os.getenv('CMC_API_KEY')

stock_data = PyTickerSymbols()
SP500 = stock_data.get_stocks_by_index('S&P 500')  # Corrected index name

#

asset_list = []
crypto_list = []
for stock in SP500:
    asset_list.append(stock['symbol'])

# crypto list

from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

cmc_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
parameters = {
  'convert':'USD'
}
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': CMC_API_KEY
}

session = Session()
session.headers.update(headers)

try:
    response = session.get(cmc_url, params=parameters)
    data = json.loads(response.text)
    for i in range (0, 100):
        crypto_list.append(data['data'][i]['symbol'])
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)

#print(asset_list, '\n\n\n', crypto_list)

app = Flask(__name__)

@app.get("/getAllCompanies")
def getAllCompanies():
    return jsonify(asset_list)

@app.get("/getTopCrypto")
def getTopCrypto():
    return jsonify(crypto_list)

if __name__ == "__main__":
    app.run()