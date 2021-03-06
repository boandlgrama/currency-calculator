var input = document.getElementById("input"),
  output = document.getElementById("output"),
  buttons = [
    document.getElementById("0"),
    document.getElementById("1"),
    document.getElementById("2"),
    document.getElementById("3"),
    document.getElementById("4"),
    document.getElementById("5"),
    document.getElementById("6"),
    document.getElementById("7"),
    document.getElementById("8"),
    document.getElementById("9"),
    document.getElementById("eq"),
    document.getElementById("C")
  ],
  inputCurrencySelector = document.getElementById("originSel"),
  outputCurrencySelector = document.getElementById("targetSel"),
  feeSelector = document.getElementById("feeSel");

export class CalculatorView {
  // currencyCallback;
  constructor() {
    feeSelector.value =
      window.localStorage.fee == null ? "0.00" : window.localStorage.fee;
  }
  setOutputInteger(number) {
    return (output.innerHTML = parseInt(number));
  }
  setInputInteger(number) {
    return (input.innerHTML = parseInt(number));
  }
  setCurrencyChangedCallback(callback) {
    this.currencyCallback = callback;
    let selectionChangedCallback = () => {
      let selection = {
        input: inputCurrencySelector.value,
        output: outputCurrencySelector.value
      };
      this.currencyCallback(selection);
      window.localStorage.inputCurrency = inputCurrencySelector.value;
      window.localStorage.outputCurrency = outputCurrencySelector.value;
    };
    inputCurrencySelector.addEventListener("change", selectionChangedCallback);
    outputCurrencySelector.addEventListener("change", selectionChangedCallback);
  }

  setFeeChangedCallback(callback) {
    feeSelector.addEventListener("change", () => {
      callback(feeSelector.value);
      window.localStorage.fee = feeSelector.value;
    });
    callback(feeSelector.value);
  }

  setButtonsClickCallback(callback) {
    let button;
    for (button of buttons) {
      let btn = button;
      button.addEventListener("click", () => callback(btn.id));
    }
  }
  setAvailableCurrencies(availableCurrencies) {
    inputCurrencySelector.innerHTML = "";
    outputCurrencySelector.innerHTML = "";
    availableCurrencies.forEach(currency => {
      let [name, symbols] = currency;
      let [symbol, flag] = symbols;
      let currencyOption = `<option value="${name}">${symbol} ${flag}</option>\n`;
      inputCurrencySelector.innerHTML += currencyOption;
      outputCurrencySelector.innerHTML += currencyOption;
    });
    inputCurrencySelector.value =
      window.localStorage.inputCurrency == null
        ? "EUR"
        : window.localStorage.inputCurrency;
    outputCurrencySelector.value =
      window.localStorage.outputCurrency == null
        ? "GBP"
        : window.localStorage.outputCurrency;
    let selection = {
      input: inputCurrencySelector.value,
      output: outputCurrencySelector.value
    };
    this.currencyCallback(selection);
  }
}
