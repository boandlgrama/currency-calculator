var view = new CalculatorView(),
  model = new CalculatorModel(),
  controller = null;

class CalculatorController {
  init = () => {
    view.setButtonsClickCallback(input => {
      model.handleInput(input);
      view.displayInteger(model.getCurrentOutput());
    });
  };
}

controller = new CalculatorController();

window.addEventListener("load", controller.init);
