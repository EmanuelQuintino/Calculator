const expression = document.querySelector(".expression");
const expressionDisplay = document.querySelector(".expressionDisplay");
const buttons = document.querySelectorAll(".gridButtons button");
const buttonOpenHistory = document.querySelector(".buttonOpenHistory");
const modalHistory = document.querySelector(".modalHistory");
const containerHistory = document.querySelector(".containerHistory");
const buttonCloseModal = document.querySelector(".buttonCloseModal");
const buttonClearHistory = document.querySelector(".buttonClearHistory");

function clearScreen() {
  expression.innerHTML = "";
  expressionDisplay.innerHTML = "";
}

function deleteCharacter() {
  expression.innerHTML = expression.innerHTML.slice(0, -1);
}

function getCalculatorHistory() {
  return JSON.parse(localStorage.getItem("@calculator:history"));
}

function executeExpression() {
  if (
    (expression.innerHTML.length > 0 && expression.innerHTML.includes("+")) ||
    expression.innerHTML.includes("-") ||
    expression.innerHTML.includes("x") ||
    expression.innerHTML.includes("/") ||
    expression.innerHTML.includes("%")
  ) {
    try {
      expressionDisplay.innerHTML = expression.innerHTML;
      expression.innerHTML = String(
        eval(expression.innerHTML.replaceAll("x", "*").replaceAll("%", "/100"))
      ).slice(0, totalNumbersDisplay - 5); // to continue expression

      const calculatorHistory = getCalculatorHistory();

      if (calculatorHistory) {
        localStorage.setItem(
          "@calculator:history",
          JSON.stringify([
            ...calculatorHistory.slice(-20), // limit history
            {
              result: expression.innerHTML,
              expression: expressionDisplay.innerHTML,
            },
          ])
        );
      } else {
        localStorage.setItem(
          "@calculator:history",
          JSON.stringify([
            {
              result: expression.innerHTML,
              expression: expressionDisplay.innerHTML,
            },
          ])
        );
      }
    } catch (error) {
      expression.innerHTML = "Error";
      console.error(error);
      isError = true;
    }
  }
}

function updateHistory() {
  const calculatorHistory = getCalculatorHistory();

  containerHistory.innerHTML = "";
  if (calculatorHistory) {
    for (let i = calculatorHistory.length - 1; i >= 0; i--) {
      containerHistory.innerHTML += `
        <div class="boxHistory">
          <div class="expressionHistory">${calculatorHistory[i].expression}</div>
          <div class="resultHistory">${calculatorHistory[i].result}</div>
        </div>
      `;
    }
  } else {
    containerHistory.innerHTML = `<div class="emptyHistory">Vazio</div>`;
  }
}

function typeDisplay(button) {
  if (expression.innerHTML.length >= totalNumbersDisplay) return;

  const operations = ["+", "-", "x", "/", "."];
  const endExpression = expression.innerHTML.slice(-1);

  if (operations.includes(endExpression) && operations.includes(button)) {
    expression.innerHTML = expression.innerHTML.slice(0, -1) + button;
  } else {
    expression.innerHTML += button;
  }
}

buttonOpenHistory.addEventListener("click", () => {
  modalHistory.showModal();
  updateHistory();
});

buttonCloseModal.addEventListener("click", () => {
  modalHistory.close();
});

buttonClearHistory.addEventListener("click", () => {
  if (getCalculatorHistory()) {
    const responseToClear = confirm("Deseja limpar histórico?");
    if (responseToClear) {
      localStorage.removeItem("@calculator:history");
      updateHistory();
    }
  }
});

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
        deleteCharacter();
        break;
      case "=":
        executeExpression();
        updateHistory();
        break;
      default:
        typeDisplay(button.innerHTML);
        break;
    }
  });
});
