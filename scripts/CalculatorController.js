import { CalculatorView } from "./CalculatorView.js";
import { CalculatorModel } from "./CalculatorModel.js";

var view = new CalculatorView(),
  model = null,
  controller = null;

class CalculatorController {
  init() {
    model = new CalculatorModel(currencies => {
      view.setAvailableCurrencies(currencies);
      view.setCurrencyChangedCallback(model.setCurrencies);
      view.setFeeChangedCallback(model.setTransactionFee);
    });
    view.setButtonsClickCallback(input => {
      model.handleInput(input);
      view.setInputInteger(model.getCurrentInputValue());
      view.setOutputInteger(model.getCurrentOutputValue());
    });
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
