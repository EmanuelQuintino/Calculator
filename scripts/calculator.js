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
      case "=":
        let newExpression = expression.innerHTML.replace("x", "*");
        newExpression = newExpression.replace("%", "/100");
        expression.innerHTML = eval(newExpression);
        pressEquals = true;
        break;
      default:
        expression.innerHTML += button.innerHTML;
    }
  });
});
