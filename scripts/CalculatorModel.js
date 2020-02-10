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
  constructor(getCurrencySymbolsCallback) {
    if (navigator.onLine) {
      getExchangeRates(rates => {
        exchangeRates = rates;
        window.localStorage.exchangeRates = JSON.stringify(exchangeRates);
        getCurrencySymbolsCallback(
          exchangeRates.map(currency => [
            currency.name,
            CurrencySymbolDictionary[currency.name]
          ])
        );
      });
    } else {
      exchangeRates = JSON.parse(window.localStorage.exchangeRates);
      getCurrencySymbolsCallback(
        exchangeRates.map(currency => [
          currency.name,
          CurrencySymbolDictionary[currency.name]
        ])
      );
    }
  }
  handleInput(input) {
    switch (input) {
      case "C": {
        displayedInputValue = 0;
        break;
      }
      case "eq": {
        console.log(
          `Input: ${displayedInputValue} Rin: ${inputRate} Rout: ${outputRate} TransactionFee: ${1.0 +
            transactionFee}`
        );
        let amountWithFee = (1.0 + transactionFee) * displayedInputValue;
        console.log(`amountWithFee: ${amountWithFee}`);
        displayedOutputValue = (outputRate * amountWithFee) / inputRate;
        console.log(`Calculated output: ${displayedOutputValue}`);
        isCalculated = true;
        break;
      }
      default: {
        let digit = parseInt(input);
        displayedInputValue = isCalculated
          ? digit
          : 10 * displayedInputValue + digit;
        isCalculated = false;
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
