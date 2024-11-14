function createInputFields() {
    const numEvents = parseInt(document.getElementById("numEvents").value);
    const inputFieldsDiv = document.getElementById("inputFields");
    inputFieldsDiv.innerHTML = ""; // Limpiar campos anteriores
    document.getElementById("result").innerHTML = ""; // Limpiar resultados anteriores

    if (numEvents === 2 || numEvents === 3) {
        for (let i = 1; i <= numEvents; i++) {
            const input = document.createElement("input");
            input.type = "number";
            input.id = "odds" + i;
            input.placeholder = "Ingresa cuota " + i;
            inputFieldsDiv.appendChild(input);
        }
        document.getElementById("calculateBtn").style.display = "block";
    } else {
        alert("Por favor, ingresa 2 o 3 como número de eventos.");
    }
}

function calculate() {
    const numEvents = parseInt(document.getElementById("numEvents").value);
    let totalProbability = 0;
    let probabilities = [];

    // Calcular probabilidades implícitas
    for (let i = 1; i <= numEvents; i++) {
        const odds = parseFloat(document.getElementById("odds" + i).value);
        if (odds > 0) {
            const probability = (1 / odds) * 100;
            probabilities.push({odds: odds, probability: probability.toFixed(2)});
            totalProbability += probability;
        } else {
            alert("Ingresa una cuota válida para cada evento.");
            return;
        }
    }

    // Calcular overround
    const overround = totalProbability - 100;

    // Mostrar resultados en un formato de casillas
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Limpiar resultados anteriores

    probabilities.forEach((item, index) => {
        const resultBox = document.createElement("div");
        resultBox.className = "result-box";
        resultBox.innerHTML = `<span>Cuota ${index + 1}:</span> ${item.odds} | <span>Probabilidad:</span> ${item.probability}%`;
        resultDiv.appendChild(resultBox);
    });

    const overroundBox = document.createElement("div");
    overroundBox.className = "result-box overround";
    overroundBox.innerHTML = `<span>Overround:</span> ${overround.toFixed(2)}%`;
    resultDiv.appendChild(overroundBox);
}
