// here we set our question Index to be ready to accept a value
let questionIndex = 0;
// here we set out total time for the start of the quiz
let time = 100;
let timerId;

// here we get our html elements by their Ids to be used later on in the code
let questionsEl = document.getElementById("questions");
let optionsEl = document.getElementById("options");
let startBtn = document.getElementById("start");
let feedbackEl = document.getElementById("feedback");
let endScreenEl = document.getElementById("end-screen");
let finalScoreEl = document.getElementById("final-score");
let timerEl = document.getElementById("time");
let initialsEl = document.getElementById("initials");
let submitBtn = document.getElementById("submit");

function tickClock() {
  //causes the time to decrease, also runs the results function if the time is equal to or less than 0
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    results();
  }
}

function startQuiz() {
  // after pushing button it hides the start screen then displays the questions.
  // this function also sets the time and runs the clockTick function to decrease the time
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(tickClock, 1000);

  timerEl.textContent = time;

  // This will run the askQuestion function
  askQuestion();
}

function askQuestion() {
  // this will display a question as well as its choices from the question Index.
  let currentQuestion = quizQuestions[questionIndex];

  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  optionsEl.innerHTML = "";
  //this loops through avalible questions
  for (var i = 0; i < currentQuestion.multipleChoice.length; i++) {
    //creates buttons for each choice, so that the users selection can be registered
    let options = currentQuestion.multipleChoice[i];
    let optionNode = document.createElement("button");
    optionNode.setAttribute("class", "options");
    optionNode.setAttribute("value", options);

    optionNode.textContent = options;

    optionsEl.appendChild(optionNode);
  }
}

function pickAnswer(event) {
  let buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches(".options")) {
    return;
  }

  // check if user guessed wrong or correct
  if (buttonEl.value === quizQuestions[questionIndex].correctAnswer) {
    //if the user selects correctly, they will get the text Correct as feedback and not lose any time
    feedbackEl.textContent = "Correct!";
  } else {
    //if the user guessed wrong, they will get the text Wrong as feedback and be deducted 20 seconds
    feedbackEl.textContent = "Wrong!";
    time -= 20;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
  }

  // flash right/wrong feedback on page for 2 seconds
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);

  // move to next question
  questionIndex++;

  // check if we've run out of questions or time, if so then we get our results, if not we run the askQuestion function again
  if (questionIndex === quizQuestions.length || time < -0) {
    results();
  } else {
    askQuestion();
  }
}

function results() {
  //This will remove the hide class from the end screen and display the remaining time as the final score
  endScreenEl.removeAttribute("class");
  finalScoreEl.textContent = time;
  //this will his the question element and clear the remaining time
  questionsEl.setAttribute("class", "hide");
  clearInterval(timerId);
}

function saveScore() {
  // this will get what the user inputs into the initials box
  let initials = initialsEl.value;

  // make sure value wasn't empty
  if (initials !== "") {
    // this will get the highscores from the local storage, or return an empty array
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // this will create a score object for the user
    let score = {
      score: time,
      initials: initials,
    };

    // now we are seting the users score to local storage
    highscores.push(score);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // this will redirect the user to the Highscores page
    window.location.href = "Highscore.html";
  }
}

function checkForEnter(event) {
  // this will ensure that if the user presses enter, that it will register and run the saveScore function
  if (event.key === "Enter") {
    saveScore();
  }
}
// Here we add Event listeners that check for a users click on each button, then rus the correct function
startBtn.addEventListener("click", startQuiz);
optionsEl.addEventListener("click", pickAnswer);
submitBtn.addEventListener("click", saveScore);
// this checks for the checkForEnter function when a user releases the Enter key on the initials input
initialsEl.onkeyup = checkForEnter;

//this will create out object that contains all of our questions, options, and the correct answers
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
    correctAnswer: "parentheses",
  },
];
