import { CalculatorView } from "./CalculatorView.js";
import { CalculatorModel } from "./CalculatorModel.js";

var view = new CalculatorView(),
  model = new CalculatorModel(),
  controller = null;

class CalculatorController {
  init() {
    view.setCurrencyChangedCallback(model.setCurrencies);
    model.init(currencies => {
      view.setAvailableCurrencies(currencies);
    });
    view.setFeeChangedCallback(model.setTransactionFee);
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
