// Game data - questions with explanation fields
const gameData = {
    questions: [
        {
            text: "Which activity do you enjoy the most?",
            options: [
                "Writing code and creating software applications",
                "Exploring new technologies and creating innovative solutions",
                "Working with hardware and managing network infrastructure", 
                "Analyzing data and creating business insights",
                "Identifying security risks and protecting systems"
            ],
            requiresExplanation: true,
            explanationPlaceholder: "Please explain why you enjoy this activity...",
            careerPathIndex: [0, 1, 2, 3, 4] // Maps to careerPaths array indices
        },
        {
            text: "How do you approach problem-solving?",
            options: [
                "Breaking the problem down into logical steps and coding a solution",
                "Thinking outside the box and finding creative solutions",
                "Methodically troubleshooting until I find the root cause",
                "Analyzing data patterns to understand the problem better",
                "Identifying vulnerabilities and blocking potential threats"
            ],
            requiresExplanation: true,
            explanationPlaceholder: "Please describe your problem-solving approach with a specific example...",
            careerPathIndex: [0, 1, 2, 3, 4]
        },
        {
            text: "What type of projects do you enjoy the most?",
            options: [
                "Building applications and websites",
                "Creating new and innovative products or services",
                "Setting up and maintaining IT infrastructure",
                "Organizing and analyzing large datasets",
                "Implementing security protocols and testing systems for vulnerabilities"
            ],
            requiresExplanation: true,
            explanationPlaceholder: "Please provide an example of a project you enjoyed...",
            careerPathIndex: [0, 1, 2, 3, 4]
        },
        {
            text: "Which of these subjects interests you the most?",
            options: [
                "Programming languages and software development",
                "Emerging technologies like AI, VR, or IoT",
                "Computer networks and system architecture",
                "Database design and business intelligence",
                "Cybersecurity and risk management"
            ],
            requiresExplanation: true,
            explanationPlaceholder: "Please explain why this subject interests you...",
            careerPathIndex: [0, 1, 2, 3, 4]
        },
        {
            text: "In a team project, which role would you prefer?",
            options: [
                "Developer, building the core functionality",
                "Innovation lead, bringing new ideas to the table",
                "Infrastructure specialist, ensuring everything runs smoothly",
                "Data analyst, making sense of information and guiding decisions",
                "Security expert, ensuring the project is secure from threats"
            ],
            requiresExplanation: true,
            explanationPlaceholder: "Please explain why you prefer this role...",
            careerPathIndex: [0, 1, 2, 3, 4]
        }
    ],
    
    // Career paths that will be recommended based on answers
    careerPaths: [
        {
            id: "software-engineering",
            title: "Software Engineering",
            description: "Your responses indicate you would excel in Software Engineering. You enjoy coding, logical problem-solving, and building applications that users interact with daily. Software Engineers design, develop, and maintain software systems.",
            matchScore: 0
        },
        {
            id: "innovative-development",
            title: "Innovative Development",
            description: "Your profile aligns well with Innovative Development. You enjoy creative problem-solving, emerging technologies, and thinking outside the box. This field focuses on creating novel solutions and exploring cutting-edge technologies.",
            matchScore: 0
        },
        {
            id: "network-systems",
            title: "Network & Systems Engineering",
            description: "Network & Systems Engineering appears to be a good fit for you. You enjoy working with hardware, maintaining infrastructure, and ensuring systems run smoothly. This career involves designing, implementing, and managing IT infrastructure.",
            matchScore: 0
        },
        {
            id: "business-data",
            title: "Business & Data Management",
            description: "Business & Data Management matches your interests. You enjoy analyzing data, deriving insights, and helping businesses make informed decisions. This career focuses on managing data assets and converting them into valuable information.",
            matchScore: 0
        },
        {
            id: "security-management",
            title: "Security Management",
            description: "Security Management aligns with your preferences. You're interested in identifying vulnerabilities, implementing security measures, and protecting systems from threats. This field focuses on safeguarding information and systems.",
            matchScore: 0
        }
    ]
};

// Game state
let currentQuestionIndex = 0;
let userResponses = [];

// DOM Elements
const mainMenu = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const completionScreen = document.getElementById('level-complete');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const progressFill = document.getElementById('progress-fill');
const feedbackElem = document.getElementById('feedback');
const explanationContainer = document.getElementById('explanation-container');
const explanationTextarea = document.getElementById('explanation-textarea');
const submitExplanationBtn = document.getElementById('submit-explanation-btn');

// Event Listeners
document.getElementById('start-button').addEventListener('click', startGame);
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', handleBackButton);
});
document.getElementById('next-level-button').addEventListener('click', () => {
    showScreen(mainMenu);
});
// Add event listener for the submit explanation button
submitExplanationBtn.addEventListener('click', submitExplanation);

// Create the De Haagse Hogeschool logo dynamically
function createLogo() {
    const logoImg = document.querySelector('.logo');
    if (logoImg && !logoImg.complete) {
        // If the logo image fails to load, create a canvas logo
        logoImg.onerror = function() {
            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 80;
            canvas.className = 'logo';
            
            const ctx = canvas.getContext('2d');
            
            // Background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Main blue rectangle
            ctx.fillStyle = '#009fe3'; // DHH blue
            ctx.fillRect(10, 20, 180, 40);
            
            // Text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Arial';
            ctx.fillText('De Haagse', 30, 40);
            ctx.fillText('Hogeschool', 30, 55);
            
            // Replace the img with canvas
            logoImg.parentNode.replaceChild(canvas, logoImg);
        };
    }
}

// Initialize logo
document.addEventListener('DOMContentLoaded', createLogo);

// Navigation Functions
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function startGame() {
    currentQuestionIndex = 0;
    userResponses = [];
    // Reset career path scores
    gameData.careerPaths.forEach(path => path.matchScore = 0);
    showQuestion();
    showScreen(gameScreen);
}

function handleBackButton(e) {
    const currentScreen = e.target.closest('.screen');
    
    if (currentScreen === gameScreen) {
        showScreen(mainMenu);
    } else if (currentScreen === completionScreen) {
        showScreen(mainMenu);
    }
}

// Game Functions
function showQuestion() {
    const question = gameData.questions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = question.text;
    
    // Clear and create answer options
    answerOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index, option));
        answerOptions.appendChild(optionElement);
    });
    
    // Hide explanation container initially
    explanationContainer.style.display = 'none';
    
    updateProgressBar();
}

function selectAnswer(index, option) {
    const question = gameData.questions[currentQuestionIndex];
    
    // Get all answer options
    const options = answerOptions.querySelectorAll('.answer-option');
    
    // Highlight selected answer
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
    
    // Store the selected answer index to use when updating career path scores
    explanationContainer.dataset.selectedIndex = index;
    
    // If explanation is required, show the explanation container
    if (question.requiresExplanation) {
        explanationContainer.style.display = 'block';
        explanationTextarea.value = '';
        explanationTextarea.placeholder = question.explanationPlaceholder;
        explanationTextarea.focus();
    } else {
        // If no explanation needed, update career path scores and move to next question
        updateCareerScores(index);
        userResponses.push({
            question: question.text,
            answer: option,
            explanation: ''
        });
        
        moveToNextQuestion();
    }
}

function submitExplanation() {
    const question = gameData.questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.answer-option.selected');
    
    if (!selectedOption) {
        alert('Please select an answer first');
        return;
    }
    
    const explanation = explanationTextarea.value.trim();
    
    if (explanation === '') {
        alert('Please provide an explanation');
        return;
    }
    
    // Get the selected index from the dataset
    const selectedIndex = parseInt(explanationContainer.dataset.selectedIndex);
    
    // Update career path scores based on selection
    updateCareerScores(selectedIndex);
    
    // Save the response
    userResponses.push({
        question: question.text,
        answer: selectedOption.textContent,
        explanation: explanation
    });
    
    // Move to next question
    moveToNextQuestion();
}

// Update scores for each career path based on selected option
function updateCareerScores(selectedIndex) {
    const question = gameData.questions[currentQuestionIndex];
    const careerPathIndex = question.careerPathIndex[selectedIndex];
    
    // Increment score for the career path that corresponds to the selected option
    if (careerPathIndex !== undefined) {
        gameData.careerPaths[careerPathIndex].matchScore++;
    }
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < gameData.questions.length) {
        showQuestion();
    } else {
        completeGame();
    }
}

function completeGame() {
    // Generate feedback based on responses
    let feedback = generateFeedback();
    
    // Save results to JSON file
    saveResultsToJson();
    
    // Display feedback
    feedbackElem.innerHTML = feedback;
    
    // Show completion screen
    showScreen(completionScreen);
}

// Save quiz results to a JSON file
function saveResultsToJson() {
    const results = {
        answers: userResponses.map(response => ({
            question: response.question,
            answer: response.answer,
            explanation: response.explanation
        })),
        recommendedCareer: getRecommendedCareer(),
        allCareerScores: gameData.careerPaths.map(path => ({
            career: path.title,
            score: path.matchScore
        }))
    };
    
    // Create a JSON string
    const jsonString = JSON.stringify(results, null, 2);
    
    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], { type: "application/json" });
    
    // Create a download link and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "it_career_quiz_results.json";
    downloadLink.click();
}

// Get the recommended career path
function getRecommendedCareer() {
    // Find career path with highest score
    return gameData.careerPaths.reduce((highestPath, currentPath) => {
        return currentPath.matchScore > highestPath.matchScore ? currentPath : highestPath;
    }, gameData.careerPaths[0]);
}

function generateFeedback() {
    // Get recommended career path
    const recommendedCareer = getRecommendedCareer();
    
    // Generate personalized feedback
    let feedback = '<h3>Your HBO-ICT Career Profile</h3>';
    
    // Add career recommendation
    feedback += '<div class="career-recommendation">';
    feedback += `<h4>Recommended IT Career Path: ${recommendedCareer.title}</h4>`;
    feedback += `<p>${recommendedCareer.description}</p>`;
    feedback += '</div>';
    
    // Generate score chart
    feedback += '<div class="career-scores">';
    feedback += '<h4>How You Scored:</h4>';
    feedback += '<div class="score-chart">';
    
    // Sort career paths by score (descending)
    const sortedPaths = [...gameData.careerPaths].sort((a, b) => b.matchScore - a.matchScore);
    
    sortedPaths.forEach(path => {
        const percentage = (path.matchScore / gameData.questions.length) * 100;
        feedback += `<div class="chart-bar-container">
            <div class="chart-label">${path.title}</div>
            <div class="chart-bar-wrapper">
                <div class="chart-bar" style="width: ${percentage}%"></div>
            </div>
            <div class="chart-score">${path.matchScore}</div>
        </div>`;
    });
    
    feedback += '</div></div>';
    
    // Add response summary
    feedback += '<div class="response-summary">';
    feedback += '<h4>Your Responses:</h4>';
    feedback += '<ul>';
    
    userResponses.forEach(response => {
        feedback += `<li><strong>${response.question}</strong><br>`;
        feedback += `Answer: ${response.answer}<br>`;
        if (response.explanation) {
            feedback += `Explanation: ${response.explanation}</li>`;
        }
    });
    
    feedback += '</ul></div>';
    
    return feedback;
}

function updateProgressBar() {
    const totalQuestions = gameData.questions.length;
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
    progressFill.style.width = `${progressPercentage}%`;
}

// Add CSS for new elements
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .answer-option.selected {
        background-color: var(--dhh-blue);
        color: white;
    }
    
    #explanation-container {
        margin-top: 20px;
        width: 100%;
    }
    
    #explanation-textarea {
        width: 100%;
        min-height: 100px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: Arial, sans-serif;
        resize: vertical;
    }
    
    #submit-explanation-btn {
        margin-top: 10px;
        background-color: var(--dhh-green);
    }
    
    .response-summary {
        margin: 20px 0;
        text-align: left;
    }
    
    .response-summary ul {
        list-style-type: none;
        padding: 0;
    }
    
    .response-summary li {
        margin-bottom: 15px;
        padding: 10px;
        background-color: var(--dhh-gray);
        border-radius: 5px;
    }
    
    .career-recommendation {
        background-color: var(--dhh-gray);
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
        text-align: left;
    }
    
    .career-recommendation h4 {
        color: var(--dhh-blue);
        margin-bottom: 10px;
    }
    
    .career-scores {
        margin: 20px 0;
        text-align: left;
    }
    
    .career-scores h4 {
        margin-bottom: 15px;
    }
    
    .score-chart {
        max-width: 600px;
        margin: 0 auto;
    }
    
    .chart-bar-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .chart-label {
        width: 200px;
        text-align: right;
        padding-right: 15px;
        font-weight: bold;
    }
    
    .chart-bar-wrapper {
        flex-grow: 1;
        height: 25px;
        background-color: var(--dhh-gray);
        border-radius: 3px;
        overflow: hidden;
    }
    
    .chart-bar {
        height: 100%;
        background-color: var(--dhh-blue);
        width: 0%;
        transition: width 1s ease-out;
    }
    
    .chart-score {
        width: 30px;
        text-align: center;
        font-weight: bold;
        margin-left: 10px;
    }
`;

document.head.appendChild(additionalStyles); 