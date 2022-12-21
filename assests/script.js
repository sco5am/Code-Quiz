var questionIndex = 0;
var totalAnswer = 5;

var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
  // after pushing button it hides the start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  //   after the start screen is hidden it calls the questions function to load
  askQuestion();
}

function askQuestion() {
  var currentQuestion = quizQuestions[questionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";
//loop through avalible questions
  for (var i = 0; i < currentQuestion.multipleChoice.length; i++) {
    var choice = currentQuestion.multipleChoice[i];
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = choice;

    choicesEl.appendChild(choiceNode);
  }
}

function pickAnswer(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches(".choice")) {
    return;
  }

  // check if user guessed wrong or correct
  if (buttonEl.value !== quizQuestions[questionIndex].correctAnswer) {
    feedbackEl.textContent = "Wrong!";
    totalAnswer--;
  } else {
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for a second
  feedbackEl.setAttribute("class", "feedback text-center");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  questionIndex++;

  // check if we've run out of questions
  if (questionIndex === quizQuestions.length) {
    results();
  } else {
    askQuestion();
  }
}




startBtn.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", pickAnswer);

var quizQuestions = [
  {
      question: 'Which of the following is NOT an event?',
      multipleChoice: [
          'Keydown',
          'Change',
          'Click',
          'Function',
      ],
      correctAnswer: "Function",
  },
   {
      question: 'what Does API stand for?',
      multipleChoice: [
          'Application Programming Interface',
          'Always Plug Information',
          'Application Pre-intrigration',
          'Anytime Programming Instruction',
      ],
      correctAnswer: "Application Programming Interface",
   },  
  
   {
      question: 'Commonly used data types include:',
      multipleChoice: [
          'Numbers',
          'Booleans',
          'Strings',
          'All of the above',
      ],
      correctAnswer: 'All of the above',
   },  
  
   {
      question: 'String values must be enclosed within ____ when being assigned to variables.',
      multipleChoice: [
          '< or > signs',
          'quotes',
          'square brackets',
          'parentheses',
      ],
      correctAnswer: 'quotes'
   },  
  
   {
      question: 'The condition in an if / else statement is enclosed within ____.',
      multipleChoice: [
          'square brackets',
          'quotes',
          'parentheses',
          '< or > signs',
      ],
      correctAnswer: 'parenthese',
   },  
  ]
