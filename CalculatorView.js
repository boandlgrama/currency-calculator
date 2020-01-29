var output = document.getElementById("output"),
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
  ];

class CalculatorView {
  displayInteger = number => (output.innerHTML = parseInt(number));

  setButtonsClickCallback = callback => {
    let button;
    for (button of buttons) {
      let btn = button;
      button.addEventListener("click", () => callback(btn.id));
    }
  };
}

// var calc = new CalculatorView();
// calc.setButtonsClickCallback(id => {
//   console.log(id);
//   calc.displayInteger(id);
// });
