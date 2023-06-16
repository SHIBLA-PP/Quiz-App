const questions =[
    {
        Question:"Which is the largest animal in the world?",
        Answers: [
            { Text: "Shark" , correct: false},
            { Text: "Blue whale" , correct: true},
            { Text: "Elephat" , correct: false},
            { Text: "Giraff" , correct: false}
        ]
    },
    {
        Question:"Which is the national flower of India?",
        Answers: [
            { Text: "Lotus" , correct: true},
            { Text: "Rose" , correct: false},
            { Text: "Dalia" , correct: false},
            { Text: "Jasmine" , correct: false}
        ]
    },
    {
        Question:"Which is the largest Railway station in Kerala?",
        Answers: [
            { Text: "kottayam" , correct: false},
            { Text: "Shornour" , correct: false},
            { Text: "Ernakulam-south" , correct: true},
            { Text: "Idukki" , correct: false}
        ]
    },
    {
        Question:"Which is the largest desert in the world?",
        Answers: [
            { Text: "Kalahari" , correct: false},
            { Text: "Gobi" , correct: false},
            { Text: "Sahara" , correct: false},
            { Text: "Anrarctica" , correct: true}
        ]
    },
    {
        Question:"Which is the smallest continent in the world?",
        Answers: [
            { Text: "Asia" , correct: false},
            { Text: "Australia" , correct: true},
            { Text: "Arctic" , correct: false},
            { Text: "Africa" , correct: false}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerBbutton = document.getElementById("answer-button");
const nextButtno = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButtno.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let QuestionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = QuestionNo + "." + currentQuestion.Question;

    currentQuestion.Answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerBbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButtno.style.display = "none";
    while(answerBbutton.firstChild){
        answerBbutton.removeChild(answerBbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerBbutton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.ariaDisabled=true;
    });

    nextButtno.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButtno.innerHTML = `Play Again`;
    nextButtno.style.display ="block";
}

function handlenextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButtno.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handlenextButton();
    }else{
        startQuiz();
    }
});




startQuiz();