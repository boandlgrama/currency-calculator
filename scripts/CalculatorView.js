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
    document.getElementById("="),
    document.getElementById("C")
  ],
  inputCurrencySelector = document.getElementById("originSel"),
  outputCurrencySelector = document.getElementById("targetSel");

export class CalculatorView {
  constructor(availableCurrencies) {
    availableCurrencies.forEach(currency => {
      let currencyOption = `<option value="${currency}">${currency}</option>\n`;
      inputCurrencySelector.innerHTML += currencyOption;
      outputCurrencySelector.innerHTML += currencyOption;
    });
  }
  setOutputInteger(number) {
    return (output.innerHTML = parseInt(number));
  }
  setInputInteger(number) {
    return (input.innerHTML = parseInt(number));
  }
  setCurrencyChangedCallback(callback) {
    let selectionChangedCallback = () => {
      let selection = {
        input: inputCurrencySelector.value,
        output: outputCurrencySelector.value
      };
      callback(selection);
    };
    inputCurrencySelector.addEventListener("change", selectionChangedCallback);
    outputCurrencySelector.addEventListener("change", selectionChangedCallback);
  }

  setButtonsClickCallback(callback) {
    let button;
    for (button of buttons) {
      let btn = button;
      button.addEventListener("click", () => callback(btn.id));
    }
  }
}

// var calc = new CalculatorView();
// calc.setButtonsClickCallback(id => {
//   console.log(id);
//   calc.displayInteger(id);
// });
