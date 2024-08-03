let questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which is largest Desert in the world?",
        answers: [
            {
                text: "Kalahari", correct: false
            },
            {
                text: "Gobi", correct: false
            },
            {
                text: "Sahara", correct: false
            },
            {
                text: "Antarctica", correct: true
            },
        ]
    },
    {
        question: "Which is the smallest country in the World?",
        answers: [
            {
                text: "Vatican City", correct: true
            },
            {
                text: "Bhutan", correct: false
            },
            {
                text: "Nepal", correct: false
            },
            {
                text: "Shri Lanka", correct: false
            },
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            {
                text: "Asia", correct: false
            },
            {
                text: "Australia", correct: true
            },
            {
                text: "Arctic", correct: false
            },
            {
                text: "Africa", correct: false
            },
        ]
    },
]


const questionElement = document.getElementById("question")
const answerBtn = document.getElementById("answer-buttons")
const nextBtn = document.getElementById("next-btn")

currentQuestionIndex = 0;
score = 0;
let timer;
let timeLeft = 30;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function startTimer() {
    timeLeft = 5;
    document.getElementById("time").innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore(); 
        }
    }, 1000);
}

function resetState() {
    clearInterval(timer);
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        
    })
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again"
    nextBtn.style.display = "block"
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();

    } else {
        startQuiz()
    }
})

nextBtn.classList.add("btn-primary")



startQuiz();