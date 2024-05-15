// Introducción del juego
const introduction = `
  <div class="intro">
    <h1>Bienvenido al Juego de la Responsabilidad</h1>
    <p>En este juego, enfrentarás una serie de situaciones en las que tendrás que tomar decisiones responsables. Tu objetivo es acumular la mayor cantidad de puntos tomando decisiones responsables. ¡Veamos qué tan responsable eres!</p>
    <button id="startButton">Comenzar</button>
  </div>
`;

// Escenarios del juego
const scenarios = [
  {
    question: "Tienes un examen importante mañana, pero tus amigos te invitan a una fiesta. ¿Qué haces?",
    options: [
      { text: "Ir a la fiesta", points: -10 },
      { text: "Quedarte a estudiar", points: 10 },
    ],
  },
  {
    question: "Encuentras una billetera en el parque. ¿Qué haces?",
    options: [
      { text: "Te la quedas", points: -10 },
      { text: "Buscas al dueño y la devuelves", points: 10 },
    ],
  },
  {
    question: "Tienes un proyecto importante en el trabajo, pero también una invitación para salir con tus amigos. ¿Qué haces?",
    options: [
      { text: "Sales con tus amigos", points: -10 },
      { text: "Trabajas en tu proyecto", points: 10 },
    ],
  },
  {
    question: "Notas que un compañero de clase necesita ayuda con una tarea. ¿Qué haces?",
    options: [
      { text: "Lo ignoras y sigues con lo tuyo", points: -10 },
      { text: "Le ofreces tu ayuda", points: 10 },
    ],
  },
  {
    question: "Tu familia necesita ayuda para limpiar la casa, pero prefieres jugar videojuegos. ¿Qué haces?",
    options: [
      { text: "Jugar videojuegos", points: -10 },
      { text: "Ayudar con la limpieza", points: 10 },
    ],
  }
];

let score = 0;
let usedIndexes = [];

// Función para iniciar el juego
function startGame() {
  const app = document.getElementById("app");
  app.innerHTML = introduction;
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", showScenario);
}

// Función para obtener un índice de escenario aleatorio
function getRandomScenarioIndex() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * scenarios.length);
  } while (usedIndexes.includes(randomIndex));
  usedIndexes.push(randomIndex);
  return randomIndex;
}

// Función para mostrar un escenario
function showScenario() {
  const currentScenarioIndex = getRandomScenarioIndex();
  const scenario = scenarios[currentScenarioIndex];
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="container">
      <h2>${scenario.question}</h2>
      ${scenario.options.map((option, index) => `
        <button onclick="chooseOption(${option.points}, this, ${currentScenarioIndex}, ${index})">${option.text}</button>
      `).join('')}
    </div>
  `;
}

// Función para elegir una opción
function chooseOption(points, button, scenarioIndex, optionIndex) {
  score += points;
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (points > 0) {
    button.classList.add("responsible");
  } else {
    button.classList.add("irresponsible");
  }

  const scenario = scenarios[scenarioIndex];
  const chosenOption = scenario.options[optionIndex];

  showFeedback(chosenOption);

  setTimeout(() => {
    if (usedIndexes.length < scenarios.length) {
      showScenario();
    } else {
      showReflection();
    }
  }, 3000);
}

// Función para mostrar la retroalimentación
function showFeedback(chosenOption) {
  const app = document.getElementById("app");
  const feedback = document.createElement("div");
  feedback.classList.add("feedback");
  feedback.innerText = chosenOption.points > 0 ? "¡Buena elección!" : "Debes reconsiderar tu decisión.";
  app.appendChild(feedback);
}

// Función para mostrar la reflexión final
function showReflection() {
  const app = document.getElementById("app");
  let reflectionMessage;

  if (score >= 40) {
    reflectionMessage = "¡Excelente! Has demostrado ser muy responsable. La responsabilidad es una cualidad esencial que te llevará lejos en la vida.";
  } else if (score >= 20) {
    reflectionMessage = "Has hecho un buen trabajo. Aún hay espacio para mejorar, pero vas por buen camino. Sigue tomando decisiones responsables.";
  } else {
    reflectionMessage = "Parece que necesitas trabajar más en tu responsabilidad. Recuerda que ser responsable te ayuda a alcanzar tus metas y a ganar la confianza de los demás.";
  }

  app.innerHTML = `
    <div class="container">
      <h2>Tu puntuación: ${score}</h2>
      <p>${reflectionMessage}</p>
      <p>La responsabilidad es la clave para el éxito y la felicidad. ¡Sigue esforzándote para tomar decisiones responsables cada día!</p>
      <button onclick="restartGame()">Volver a jugar</button>
    </div>
  `;
}

// Función para reiniciar el juego
function restartGame() {
  score = 0;
  usedIndexes = [];
  showScenario();
}

// Ejecutar startGame después de que se cargue el contenido HTML
document.addEventListener("DOMContentLoaded", startGame);
