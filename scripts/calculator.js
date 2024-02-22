const expression = document.querySelector(".expression");
const buttons = document.querySelectorAll(".gridButtons button");
const expressionDisplay = document.querySelector(".expressionDisplay");

function clearScreen() {
  expression.innerHTML = "";
  expressionDisplay.innerHTML = "";
}

let isError = false;
const totalNumbersDisplay = 15;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isError) {
      clearScreen();
      isError = false;
    }

    switch (button.innerHTML) {
      case "C":
        clearScreen();
        break;
      case "DEL":
        expression.innerHTML = expression.innerHTML.slice(0, -1);
        break;
      case ".":
        if (
          expression.innerHTML.length > 0 &&
          !/\d*\.\d*\.?/.test(expression.innerHTML.slice(-1))
        ) {
          expression.innerHTML += ".";
        }
        break;
      case "=":
        if (expression.innerHTML.length > 0) {
          let newExpression = expression.innerHTML.replace("x", "*");
          newExpression = newExpression.replace("%", "/100");
          try {
            const auxExpressionDisplay = expression.innerHTML;

            // substring totalNumbersDisplay - 0 for to continue expression
            expression.innerHTML = String(eval(newExpression)).substring(
              0,
              totalNumbersDisplay - 0
            );
            expressionDisplay.innerHTML = auxExpressionDisplay;
          } catch (error) {
            expression.innerHTML = "Error";
            console.error(error);
            isError = true;
          }
        }
        break;
      default:
        if (expression.innerHTML.length >= totalNumbersDisplay) return;

        const operations = ["+", "-", "x", "/"];
        const endExpression = expression.innerHTML.slice(-1);

        if (operations.includes(endExpression) && operations.includes(button.innerHTML)) {
          expression.innerHTML = expression.innerHTML.slice(0, -1) + button.innerHTML;
        } else {
          expression.innerHTML += button.innerHTML;
        }
    }
  });
});
