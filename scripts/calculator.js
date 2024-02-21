const expression = document.querySelector(".expression");
const buttons = document.querySelectorAll(".gridButtons button");

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
        break;
      case "DEL":
        const end = expression.innerHTML.length - 1;
        const delExpression = expression.innerHTML.substring(0, end);
        expression.innerHTML = delExpression;
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
            expression.innerHTML = String(eval(newExpression)).substring(0, 14);
            pressEquals = true;
          } catch (error) {
            console.error(error);
          }
        }
        break;
      default:
        if (expression.innerHTML.length >= 14) return; // verificar
        expression.innerHTML += button.innerHTML;
    }
  });
});
