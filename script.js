let points = 0;
let correctAnswersCount = 0;
let userAnswers = [];

function showAnswerFeedback(isCorrect, correctAnswer, userAnswer) {
    const feedbackElement = document.getElementById('answerFeedback');
    const correctAnswerElement = feedbackElement.querySelector('.correct-answer');
    const incorrectAnswerElement = feedbackElement.querySelector('.incorrect-answer');

    if (isCorrect) {
        correctAnswerElement.classList.add('show');
        incorrectAnswerElement.classList.remove('show');
    } else {
        correctAnswerElement.classList.remove('show');
        incorrectAnswerElement.classList.add('show');
        incorrectAnswerElement.innerText = `Wrong Answer! The correct answer is: ${correctAnswer}`;
    }

    // Store user's answer for later display
    userAnswers.push(userAnswer);
}

function checkAnswer(currentSection) {
    // Assuming correct answers for each section
    const correctAnswers = [null, 'b', 'c', 'c', 'c', 'c']; // Index 0 is not used

    // Check the selected answer in the current section
    const selectedAnswer = document.querySelector(`#section${currentSection} input:checked`).value;

    // Display correct and incorrect answer feedback with fading animation
    showAnswerFeedback(selectedAnswer === correctAnswers[currentSection], correctAnswers[currentSection], selectedAnswer);

    // Update points and score immediately
    if (selectedAnswer === correctAnswers[currentSection]) {
        points += 3;
        correctAnswersCount++;
    }

    // Update score in the top right corner
    document.getElementById('score').innerText = correctAnswersCount;

    // Hide current section
    document.getElementById(`section${currentSection}`).style.display = 'none';

    // Show next section or display the final result
    const nextSection = currentSection + 1;
    if (nextSection <= 5) {
        document.getElementById(`section${nextSection}`).style.display = 'block';
    } else {
        // Display the final result
        displayFinalResult();

    // Display additional message
    const additionalMessage = document.getElementById('additionalMessage');
    additionalMessage.innerText = "Show this screen to any one of us (Pranav R, Mysha, or Karthik) to redeem your digital certificate.";

    }
}

function displayFinalResult() {
    // Display user's answers for each question
    for (let i = 1; i <= 5; i++) {
        const userAnswerDisplay = document.getElementById(`userAnswer${i}`);
        const userAnswer = userAnswers[i];
        userAnswerDisplay.innerText = `Your Answer: ${userAnswer}`;
    }

    // Display the final result container
    document.getElementById('resultContainer').style.display = 'block';

    // Display the user's score and answers
    document.getElementById('congratulationsText').innerText = `You got ${correctAnswersCount} out of 5.`;

    // Trigger confetti animation
    startConfettiAnimation();
}

function startConfettiAnimation() {
    // Display confetti and trigger animation
    const confettiElement = document.querySelector('.confetti');
    confettiElement.classList.add('show');
    jsConfetti.addConfetti({ emojis: ['🎉', '👏'], confettiNumber: 100 });

    // Hide confetti after animation
    setTimeout(() => {
        confettiElement.classList.remove('show');
        // Display the "Show Image" button after the confetti animation
        document.getElementById('showImageButton').style.display = 'block';
    }, 3000); // Adjust the time based on your preference
}

// Function to display the image and prevent further retakes
function showImage() {
    // Hide the "Show Image" button
    document.getElementById('showImageButton').style.display = 'none';

    // Display the image container
    document.getElementById('imageContainer').style.display = 'block';

    // Display the final result container
    document.getElementById('resultSection').style.display = 'block';

    // Update the flag to indicate that the quiz has been completed
    localStorage.setItem('quizCompleted', 'true');
}

// Check if the user has already completed the quiz
const quizCompleted = localStorage.getItem('quizCompleted');

if (quizCompleted === 'true') {
    // Quiz already completed, show the result and image
    showImage();
} else {
    // Quiz not completed, continue with the quiz logic
    // ... (your existing code) ...
}

// Additional certificate generation logic
function generateCertificate() {
    const userName = document.getElementById('userName').value;
    const certificateDate = document.getElementById('certificateDate').value;

    // Check if the user has completed the quiz
    if (correctAnswersCount === 5) {
        // User has a perfect score, generate certificate
        const certificateTemplate = document.getElementById('certificateTemplate');
        const certificateName = document.getElementById('certificateName');
        const certificateDateSpan = document.getElementById('certificateDateSpan');

        // Display user's name and certificate date on the certificate template
        certificateName.innerText = userName;
        certificateDateSpan.innerText = certificateDate;

        // Display the certificate template
        certificateTemplate.style.display = 'block';
    } else {
        alert("You need a perfect score to generate a certificate. Complete the quiz first!");
    }
}
</script>
