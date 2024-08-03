function showW() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; // Fix the question number increment
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Access the question property correctly

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text; // Access the answer text correctly
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}