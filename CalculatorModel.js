var displayedValue = 0,
  isCalculated = false;

class CalculatorModel { // eslint-disable-line no-unused-vars
  handleInput = input => {
    switch (input) {
      case "C": {
        displayedValue = 0;
        break;
      }
      case "=": {
        if (isCalculated) {
          // Do nothing
        } else {
          displayedValue *= 1.19;
          isCalculated = true;
        }

        break;
      }
      default: {
        let digit = parseInt(input);
        displayedValue = isCalculated ? digit : 10 * displayedValue + digit;
        isCalculated = false;
      }
    }
  };
  getCurrentOutput = () => displayedValue;
}
