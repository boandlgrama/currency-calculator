import { CalculatorView } from "./CalculatorView.js";
import { CalculatorModel } from "./CalculatorModel.js";

var view = null,
  model = null,
  controller = null;

class CalculatorController {
  constructor() {
    model = new CalculatorModel();
    let availableCurrencies = model.getCurrencySymbols();
    view = new CalculatorView(availableCurrencies);
  }
  init() {
    view.setButtonsClickCallback(input => {
      model.handleInput(input);
      view.setInputInteger(model.getCurrentInputValue());
      view.setOutputInteger(model.getCurrentOutputValue());
    });
    view.setCurrencyChangedCallback(model.setCurrencies);
  }
}

controller = new CalculatorController();

document.body.addEventListener(
  "touchmove",
  function(event) {
    event.preventDefault();
  },
  {
    passive: false,
    useCapture: false
  }
);
window.addEventListener("load", controller.init);
