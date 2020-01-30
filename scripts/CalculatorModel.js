import { getExchangeRates } from "./CurrencyFetcher.js";

var displayedInputValue = 0,
  displayedOutputValue = 0,
  isCalculated = false,
  exchangeRates = [],
  inputRate = 1.0,
  outputRate = 1.0;

export class CalculatorModel {
  constructor() {
    exchangeRates = getExchangeRates();
  }

  getCurrencySymbols() {
    console.log(exchangeRates);
    return exchangeRates.map(currency => currency.name);
  }
  handleInput(input) {
    switch (input) {
      case "C": {
        displayedInputValue = 0;
        break;
      }
      case "=": {
        console.log(`Rin: ${inputRate} Rout: ${outputRate}`);
        displayedOutputValue = (inputRate * displayedInputValue) / outputRate;
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
    console.log(currencies);
    console.log(exchangeRates);
    inputRate = exchangeRates.find(item => item.name === currencies.input).rate;
    console.log(inputRate);
    outputRate = exchangeRates.find(item => item.name === currencies.output)
      .rate;
    console.log(outputRate);
  }
}
