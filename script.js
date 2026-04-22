const quizData = [
  {
    question: "what is database",
  },
  {
    question: "DBMS full form ?",
  },
  {
    question: "what is Primary Key in database?",
  },
  {
    question: "where SQL used?",
  },
];

let currentQuiz = 0;

// Elements
const questionEl = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
const submitBtn = document.getElementById("submit");

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");

let answers = [];

// Load first question
loadQuestion();

function loadQuestion() {
  questionEl.innerText = quizData[currentQuiz].question;
  answerBox.value = "";
}

// Submit handler
submitBtn.addEventListener("click", async () => {
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const answer = answerBox.value.trim();

  if (!name || !email || !answer) {
    alert("Sab fields fill karo!");
    return;
  }

  // Save answer locally (optional)
  answers.push({
    question: quizData[currentQuiz].question,
    answer: answer,
  });

  // Send to Google Script
  await fetch(
    "https://script.google.com/macros/s/AKfycbxXMwjR9Ht97nv5GlXff-Be2MAIBaRyqF3XcLPPG0YV2bhcZpZFxNvECAD_R0XehLrD/exec",
    {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        question: quizData[currentQuiz].question,
        answer: answer,
      }),
    },
  );

  // Next question logic
  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz").innerHTML = `
      <h2>Thank you 💖</h2>
      <p>Your answers have been submitted!</p>
    `;
  }
});
