import { getExchangeRates } from "./CurrencyFetcher.js";
import { CurrencySymbolDictionary } from "./CurrencyDictionary.js";

var displayedInputValue = 0,
  displayedOutputValue = 0,
  isCalculated = false,
  exchangeRates = [],
  inputRate = 1.0,
  outputRate = 1.0,
  transactionFee = 0.0;

export class CalculatorModel {
  init(getCurrencySymbolsCallback) {
    let currencySymbols = this.getCurrencySymbols();
    if (currencySymbols != undefined) {
      getCurrencySymbolsCallback(currencySymbols);
    }
    if (navigator.onLine) {
      this.fetchCurrencies(getCurrencySymbolsCallback);
    }
  }

  getCurrencySymbols() {
    let exchangeRatesStorage = window.localStorage.exchangeRates;
    if (exchangeRatesStorage != undefined) {
      exchangeRates = JSON.parse(exchangeRatesStorage);
      return exchangeRates.map(currency => [
        currency.name,
        CurrencySymbolDictionary[currency.name]
      ]);
    }
  }

  fetchCurrencies(callback) {
    getExchangeRates(rates => {
      exchangeRates = rates;
      window.localStorage.exchangeRates = JSON.stringify(exchangeRates);
      callback(
        exchangeRates.map(currency => [
          currency.name,
          CurrencySymbolDictionary[currency.name]
        ])
      );
    });
  }

  handleInput(input) {
    switch (input) {
      case "C": {
        displayedInputValue = 0;
        break;
      }
      case "eq": {
        let amountWithFee = (1.0 + transactionFee) * displayedInputValue;
        let outputValue = (outputRate * amountWithFee) / inputRate;
        if (outputValue > 999999) {
          outputValue = 999999;
        }
        displayedOutputValue = outputValue;
        isCalculated = true;
        break;
      }
      default: {
        if (displayedInputValue < 100000) {
          let digit = parseInt(input);
          displayedInputValue = isCalculated
            ? digit
            : 10 * displayedInputValue + digit;
          isCalculated = false;
        }
      }
    }
  }
  getCurrentOutputValue() {
    return displayedOutputValue;
  }
  getCurrentInputValue() {
    return displayedInputValue;
  }
  setCurrencies(currencies) {
    inputRate = exchangeRates.find(item => item.name === currencies.input).rate;
    outputRate = exchangeRates.find(item => item.name === currencies.output)
      .rate;
  }
  setTransactionFee(fee) {
    transactionFee = parseFloat(fee);
  }
}
