const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.options li');
const submitButton = document.getElementById('submit-button');
const resultText = document.getElementById('result-text');
const nextButton = document.getElementById('next-button');

let currentQuestion = 0;
let score = 0;
let questions = [];

// Load CSV data
fetch('4지선다문제.csv')
  .then(response => response.text())
  .then(data => {
    const csvData = Papa.parse(data, { header: true });
    questions = csvData.data;

    // Set up quiz
    function setupQuiz() {
      const currentQuestionData = questions[currentQuestion];
      questionText.textContent = currentQuestionData['문제 내용'];
      options.forEach((option, index) => {
        option.querySelector('label').textContent = currentQuestionData[`오답${index + 1}`];
        option.querySelector('input').value = currentQuestionData[`오답${index + 1}`];
      });
      options[0].querySelector('label').textContent = currentQuestionData['정답'];
      options[0].querySelector('input').value = currentQuestionData['정답'];
      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        options[i].parentNode.insertBefore(options[j], options[i]);
      }
    }

    setupQuiz();

    // Submit button event listener
    submitButton.addEventListener('click', () => {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
        const correctAnswer = questions[currentQuestion]['정답'];
        if (selectedOption.value === correctAnswer) {
          score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
          setupQuiz();
          submitButton.style.display = 'block';
          nextButton.style.display = 'none';
        } else {
          resultText.textContent = `Your score is ${score} out of ${questions.length}`;
          submitButton.style.display = 'none';
          nextButton.style.display = 'none';
        }
      }
    });

    // Next button event listener
    nextButton.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        setupQuiz();
        submitButton.style.display = 'block';
        nextButton.style.display = 'none';
      } else {
        resultText.textContent = `Your score is ${score} out of ${questions.length}`;
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
      }
    });
  });