let questionIndex = 0;
let time = 100;
let timerId;

let questionsEl = document.getElementById("questions");
let choicesEl = document.getElementById("choices");
let startBtn = document.getElementById("start");
let feedbackEl = document.getElementById("feedback");
let endScreenEl = document.getElementById("end-screen");
let finalScoreEl = document.getElementById("final-score");
let timerEl = document.getElementById("time");
let initialsEl = document.getElementById("initials");
let submitBtn = document.getElementById('submit');

function tickClock() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    results();
  }
}

function startQuiz() {
  // after pushing button it hides the start screen
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(tickClock, 1000);

  timerEl.textContent = time;

  //   after the start screen is hidden it calls the questions function to load
  askQuestion();
}

function askQuestion() {
  let currentQuestion = quizQuestions[questionIndex];

  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";
  //loop through avalible questions
  for (var i = 0; i < currentQuestion.multipleChoice.length; i++) {
    let choice = currentQuestion.multipleChoice[i];
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = choice;

    choicesEl.appendChild(choiceNode);
  }
}

function pickAnswer(event) {
  let buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches(".choice")) {
    return;
  }

  // check if user guessed wrong or correct
  if (buttonEl.value !== quizQuestions[questionIndex].correctAnswer) {
    feedbackEl.textContent = "Wrong!";
    time -= 20;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
  } else {
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for a second
  feedbackEl.setAttribute("class", "feedback text-center");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);

  // move to next question
  questionIndex++;

  // check if we've run out of questions
  if (questionIndex === quizQuestions.length || time < -0) {
    results();
  } else {
    askQuestion();
  }
}

function results() {
  endScreenEl.removeAttribute("class");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
  clearInterval(timerId);
}

function saveScore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'Highscore.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveScore();
  }
}
startBtn.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", pickAnswer);
submitBtn.addEventListener('click', saveScore);
initialsEl.onkeyup = checkForEnter

let quizQuestions = [
  {
    question: "Which of the following is NOT an event?",
    multipleChoice: ["Keydown", "Change", "Click", "Function"],
    correctAnswer: "Function",
  },
  {
    question: "what Does API stand for?",
    multipleChoice: [
      "Application Programming Interface",
      "Always Plug Information",
      "Application Pre-intrigration",
      "Anytime Programming Instruction",
    ],
    correctAnswer: "Application Programming Interface",
  },

  {
    question: "Commonly used data types include:",
    multipleChoice: ["Numbers", "Booleans", "Strings", "All of the above"],
    correctAnswer: "All of the above",
  },

  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    multipleChoice: [
      "< or > signs",
      "quotes",
      "square brackets",
      "parentheses",
    ],
    correctAnswer: "quotes",
  },

  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    multipleChoice: [
      "square brackets",
      "quotes",
      "parentheses",
      "< or > signs",
    ],
    correctAnswer: "parenthese",
  },
];
