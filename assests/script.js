var questionsEl = document.querySelector('.questions')
var timerEl = document.querySelector('.time')
var startBtn = document.querySelector('.start')
var optionsEl = document.querySelector('.options')
var initials = document.querySelector('.initials')
var submitEl = document.querySelector('.submit')
var feedbackEl = document.querySelector('.feedback')
var startScreenEl = document.querySelector('.start-screen')
var titleEl = document.querySelector('.question-title')
var endScreenEl = document.querySelector('.end-screen');
var finalScoreEl = document.querySelector('.final-score');

var time = Questions.length*30;
var questionIndex = 0;

function StartQuiz() {

startScreenEl.setAttribute('class', 'hide');

questionsEl.removeAttribute('class', 'hide');

timerEl = setInterval(clockTick, 1000);

timerEl.textcontent =time;

Question();
}

function Question() {

    var QuestionPrompt = Questions[questionIndex];

    titleEl.textContent = QuestionPrompt.title;

    optionsEl.innerHTML = '';

    for (var i = 0; i < QuestionPrompt.options.length; i++) {
        var option = QuestionPrompt.options[i];
        var optionBtn = document.createElement('button');
        optionBtn.setAttribute('class', 'option');
        optionBtn.setAttribute('value', option)

        optionBtn.textContent = i + 1 + '.' + option;

        optionsEl.appendChild(optionBtn);
    }
}

function optionSelect(event) {
    var buttonEl = event.target;
  
    if (buttonEl !== optionsEl) {
      return;
    }
  
    if (buttonEl.value !== Questions[questionIndex].answer) {
      time -= 30;
  
      if (time < 0) {
        time = 0;
      }
  
      timerEl.textContent = time;
  
      feedbackEl.textContent = 'Incorrect';
    } else {
      
      feedbackEl.textContent = 'Correct!';
    }
    
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 2000);
  
   
    questionIndex++;
  
    if (time < 0 || questionIndex === Questions.length) {
      endQuiz();
    } else {
      Question();
    }
  }

  function runClock() {
    time--;
    timerEl.textContent = time;
  
    if (time < 0) {
      endQuiz();
    }
  }

  function endQuiz() {
    clearInterval(timerId);
    endScreenEl.removeAttribute('class');
    
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute('class', 'hide');
  }

 

  startBtn.onclick = StartQuiz;



var Questions = [
{
    title: 'Which of the following is NOT an event?',
    options: [
        'Keydown',
        'Change',
        'Click',
        'Function',
    ],
    answer: "Function",
},
 {
    title: 'what Does API stand for?',
    options:[
        'Application Programming Interface',
        'Always Plug Information',
        'Application Pre-intrigration',
        'Anytime Programming Instruction',
    ],
    answer: "Application Programming Interface",
 },  

 {
    title: 'Commonly used data types include:',
    options: [
        'Numbers',
        'Booleans',
        'Strings',
        'All of the above',
    ],
    answer: 'All of the above',
 },  

 {
    title: 'String values must be enclosed within ____ when being assigned to variables.',
    options: [
        '< or > signs',
        'quotes',
        'square brackets',
        'parentheses',
    ],
    answer: 'quotes'
 },  

 {
    title: 'The condition in an if / else statement is enclosed within ____.',
    options: [
        'square brackets',
        'quotes',
        'parentheses',
        '< or > signs',
    ],
    answer: 'parenthese',
 },  





]
