const expression = document.querySelector(".expression");
const expressionDisplay = document.querySelector(".expressionDisplay");
const buttons = document.querySelectorAll(".gridButtons button");
const buttonHistory = document.querySelector(".buttonHistory");
const modalHistory = document.querySelector(".modalHistory");
const buttonCloseModal = document.querySelector(".buttonCloseModal");

buttonHistory.addEventListener("click", () => {
  modalHistory.showModal();
});

buttonCloseModal.addEventListener("click", () => {
  modalHistory.close();
});

function clearScreen() {
  expression.innerHTML = "";
  expressionDisplay.innerHTML = "";
}

let isError = false;
const totalNumbersDisplay = 13;

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
      case "=":
        if (expression.innerHTML.length > 0) {
          try {
            expressionDisplay.innerHTML = expression.innerHTML;
            expression.innerHTML = String(
              eval(expression.innerHTML.replace("x", "*").replace("%", "/100"))
            ).slice(0, totalNumbersDisplay - 0); // to continue expression
          } catch (error) {
            expression.innerHTML = "Error";
            console.error(error);
            isError = true;
          }
        }
        break;
      default:
        if (expression.innerHTML.length >= totalNumbersDisplay) return;

        const operations = ["+", "-", "x", "/", "."];
        const endExpression = expression.innerHTML.slice(-1);

        if (operations.includes(endExpression) && operations.includes(button.innerHTML)) {
          expression.innerHTML = expression.innerHTML.slice(0, -1) + button.innerHTML;
        } else {
          expression.innerHTML += button.innerHTML;
        }
    }
  });
});
