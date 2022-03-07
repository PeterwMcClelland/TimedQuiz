
 //questions
 const questions = [
    {
        question: "What does CSS stand for??",
        choices: ["a. Cascading Style Sheets", "b. Computer Style Sheet", "c. Computer Style Supplier", "d. All of the above"],
        answer: "a. Cascading Style Sheets"},
    {
        question: "What does .js stand for?",
        choices: ["a. Junction style", "b. Javascript", "c. HTML file", "d. CSS file"],
        answer: "b. Javascript"},
    {
        question: "What is CSS used to do?",
        choices: ["a. Give the code structure", "b. Gives your code style.", "c. Connects HTML to Git Hub", "d. Uploads Images"],
        answer: "b. Gives your code style."},
    {
        question: "Who invented CSS",
        choices: ["a. Elon Musk", "b. Steve Jobs", "c. Hakon Wium Lie", "d. Mark Zuckerberg"],
        answer: "c. Hakon Wium Lie"},
    {
        question: "What type of header is the largest?",
        choices: ["a. h4", "b. h3", "c. h2", "d. h1"],
        answer: "d. h1"},
    {
        question: "What does <html lang='en'> mean?",
        choices: ["a. It tells us the language of the code.", "b. Country of origin.", "c. Email Name.", "d. None of the above."],
        answer: "a. It tells us the language of the code."},
    {
        question: "What does 'git push origin main' do in command terminal?",
        choices: ["a. Clones a repository.", "b. Pulls code from repository.", "c. Pushes your commited code to github.", "d. Clears the terminal."],
        answer: "c. Pushes your commited code to github."},
    {
        question: "What year was CPT published?",
        choices: ["a. 1984", "b. 1991", "c. 1999", "d. 1966"],
        answer: "d. 1966"},
    {
        question: "How many milliseconds are in one second?",
        choices: ["a. 10", "b. 1000", "c. 100", "d. 1"],
        answer: "b. 1000"},
    {
        question: "What selector is most powerfull?",
        choices: ["a. Class", "b. Inline style", "c. !important", "d. All equal."],
        answer: "c. !important"},
];

//references to elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

//other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

 //FUNCTIONS
var totalTime = 151;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};
function showQuiz() {
    nextQuestion();
}
function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++; 
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}
function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAns;
}
function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };
    console.log(userScore);
    scoresArray.push(userScore);
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores();
}
//high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);
    var storedHighScores = JSON.parse(savedHighScores);
    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}
//event listener
startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);
submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});
viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});
goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});
clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});