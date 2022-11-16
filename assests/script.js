var questionsEl = document.querySelector('.questions')
var timerEl = document.querySelector('.time')
var startEl = document.querySelector('.start')
var optionsEl = document.querySelector('.options')
var initials = document.querySelector('.initials')
var submitEl = document.querySelector('.submit')
var feedbackEl = document.querySelector('.feedback')
var startScreenEl = document.querySelector('.start-screen')

function StartQuiz() {

startScreenEl.setAttribute('class', 'hide');

questionsEl.removeAttribute('class', 'hide');

timerEl = setInterval(clockTick, 1000);

timerEl.textcontent =time;

question();
}
function question() {

}

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