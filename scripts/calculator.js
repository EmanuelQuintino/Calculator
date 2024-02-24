const expression = document.querySelector(".expression");
const expressionDisplay = document.querySelector(".expressionDisplay");
const buttons = document.querySelectorAll(".gridButtons button");
const buttonHistory = document.querySelector(".buttonHistory");
const modalHistory = document.querySelector(".modalHistory");
const buttonCloseModal = document.querySelector(".buttonCloseModal");
const containerHistory = document.querySelector(".containerHistory");
const clearButtonHistory = document.querySelector(".clearButtonHistory");

function clearScreen() {
  expression.innerHTML = "";
  expressionDisplay.innerHTML = "";
}

function deleteCharacter() {
  expression.innerHTML = expression.innerHTML.slice(0, -1);
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

      const historyExpressions = JSON.parse(
        localStorage.getItem("@calculator:expressionHistory")
      );

      if (historyExpressions) {
        localStorage.setItem(
          "@calculator:expressionHistory",
          JSON.stringify([
            ...historyExpressions.slice(-20), // limit history
            {
              result: expression.innerHTML,
              expression: expressionDisplay.innerHTML,
            },
          ])
        );
      } else {
        localStorage.setItem(
          "@calculator:expressionHistory",
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
  const historyExpressions = JSON.parse(
    localStorage.getItem("@calculator:expressionHistory")
  );

  containerHistory.innerHTML = "";
  if (historyExpressions) {
    for (let i = historyExpressions.length - 1; i >= 0; i--) {
      containerHistory.innerHTML += `
        <div class="boxHistory">
          <div class="expressionHistory">${historyExpressions[i].expression}</div>
          <div class="resultHitory">${historyExpressions[i].result}</div>
        </div>
      `;
    }
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

buttonHistory.addEventListener("click", () => {
  modalHistory.showModal();
  updateHistory();
});

buttonCloseModal.addEventListener("click", () => {
  modalHistory.close();
});

clearButtonHistory.addEventListener("click", () => {
  localStorage.removeItem("@calculator:expressionHistory");
  updateHistory();
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
