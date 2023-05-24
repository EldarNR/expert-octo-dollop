function convertCurrency() {
    const currencySelect = document.getElementById("currency");
    const amountInput = document.getElementById("amount");
    const resultElement = document.getElementById("result");
  
    const selectedCurrency = currencySelect.value;
    const amount = parseFloat(amountInput.value);
  //json 
    const request = new XMLHttpRequest();
    request.open("GET", "js/current.json");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send();
  
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);

        // Выбор курса валют
        let convertedAmount;
          if (selectedCurrency === "eur") {
            convertedAmount = (amount / data.current.eur).toFixed(2) + " EUR";
          } else if (selectedCurrency === "rub") {
            convertedAmount = ((amount * data.rub.rub) / data.rub.usd).toFixed(2) + " RUB";
          } else if (selectedCurrency === "kz") {
            convertedAmount = ((amount * data.td.usd) / data.td.ten).toFixed(2) + " KZT";
          }
          // Проверка
          if (!isNaN(parseFloat(convertedAmount)) && parseFloat(convertedAmount) !== 0) {
            resultElement.textContent = "Результат: " + convertedAmount;
          } else {
            resultElement.textContent = "Ошибка! Введие сумму";
          }
          
      } else {
        console.log("Error 404");
      }
    });
  }
  




