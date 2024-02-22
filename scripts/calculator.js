const expression = document.querySelector(".expression");
const buttons = document.querySelectorAll(".gridButtons button");
const expressionDisplay = document.querySelector(".expressionDisplay");

let pressEquals = false;
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (pressEquals) {
      expression.innerHTML = "";
      pressEquals = false;
    }

    switch (button.innerHTML) {
      case "C":
        expression.innerHTML = "";
        expressionDisplay.innerHTML = "";
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
            expressionDisplay.innerHTML = expression.innerHTML;
            expression.innerHTML = String(eval(newExpression)).substring(0, 14);
            pressEquals = true;
          } catch (error) {
            console.error(error);
          }
        }
        break;
      default:
        if (expression.innerHTML.length >= 18) return; // verificar
        expression.innerHTML += button.innerHTML;
    }
  });
});
