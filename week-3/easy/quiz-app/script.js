const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    }
];

const QuizApp = {
    quizData: quizData,
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,

    elements: {
        container: document.querySelector('.container'),
        quizCard: document.querySelector('.quiz-card'),
        startButton: document.getElementById('start')
    },

    init() {
        this.elements.startButton.addEventListener("click", () => {
            this.startQuiz();
        });
    },

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = Array(this.quizData.length).fill('');
        this.score = 0;
        this.elements.startButton.style.display = 'none';
        this.renderQuestion(this.currentQuestionIndex);
    },

    renderQuestion(currentQuestionIndex) {
        const currentQuestion = this.quizData[currentQuestionIndex];
        this.elements.quizCard.innerHTML = "";

        const h1 = document.createElement("h1");
        h1.textContent = currentQuestion.question;
        this.elements.quizCard.appendChild(h1);

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");

        ["a", "b", "c", "d"].forEach(optionKey => {
            const optionButton = document.createElement("button");
            optionButton.textContent = currentQuestion[optionKey];
            optionButton.classList.add("option");

            if (this.userAnswers[currentQuestionIndex] === optionKey) {
                optionButton.style.backgroundColor = "lightblue";
            }

            optionButton.addEventListener("click", () => {
                this.userAnswers[currentQuestionIndex] = optionKey;
                this.renderQuestion(currentQuestionIndex);
            });

            optionsContainer.appendChild(optionButton);
        });

        this.elements.quizCard.appendChild(optionsContainer);

        const navContainer = document.createElement("div");
        navContainer.classList.add("nav-container");

        const prevButton = document.createElement("button");
        prevButton.textContent = "< Previous";
        prevButton.disabled = currentQuestionIndex === 0;
        prevButton.addEventListener("click", () => {
            this.renderQuestion(currentQuestionIndex - 1);
        });

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next >";
        nextButton.disabled = currentQuestionIndex === this.quizData.length - 1;
        nextButton.addEventListener("click", () => {
            this.renderQuestion(currentQuestionIndex + 1);
        });

        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);

        // Submit Button - Appears Only on the Last Question
        if (currentQuestionIndex === this.quizData.length - 1) {
            const submitButton = document.createElement("button");
            submitButton.textContent = "Submit";
            submitButton.classList.add("submit-btn");
            submitButton.addEventListener("click", () => this.calculateScore());
            navContainer.appendChild(submitButton);
        }

        this.elements.quizCard.appendChild(navContainer);
    },

    calculateScore() {
        this.score = this.userAnswers.reduce((score, answer, index) => {
            return score + (answer === this.quizData[index].correct ? 1 : 0);
        }, 0);

        this.elements.quizCard.innerHTML = `<h1>Your Score: ${this.score}/${this.quizData.length}</h1>`;
        const reset=document.createElement("button");
        reset.textContent="Retake quiz";
        reset.addEventListener("click",() => this.startQuiz());
        this.elements.quizCard.appendChild(reset);
    }
};

QuizApp.init();
