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
let userName = '';

// DOM Elements
const mainMenu = document.getElementById('main-menu');
const nameInputScreen = document.getElementById('name-input');
const gameScreen = document.getElementById('game-screen');
const completionScreen = document.getElementById('level-complete');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const progressFill = document.getElementById('progress-fill');
const feedbackElem = document.getElementById('feedback');
const explanationContainer = document.getElementById('explanation-container');
const explanationTextarea = document.getElementById('explanation-textarea');
const submitExplanationBtn = document.getElementById('submit-explanation-btn');
const userNameInput = document.getElementById('user-name');
const startQuizBtn = document.getElementById('start-quiz-btn');

// Event Listeners
document.getElementById('start-button').addEventListener('click', () => {
    showScreen(nameInputScreen);
});

startQuizBtn.addEventListener('click', () => {
    userName = userNameInput.value.trim();
    if (userName) {
        startGame();
    } else {
        alert('Please enter your name to continue');
    }
});

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
    
    // Animate the answer options
    animateAnswerOptions();
    
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
    // Save results to sessionStorage
    saveResultsToStorage();
    
    // Redirect to results page
    window.location.href = 'results.html';
}

// Save quiz results to sessionStorage
function saveResultsToStorage() {
    const results = {
        name: userName,
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
    
    // Save to sessionStorage
    sessionStorage.setItem('quizResults', JSON.stringify(results));
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
    let feedback = `<h3>${userName}'s HBO-ICT Career Profile</h3>`;
    
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
    
    sortedPaths.forEach((path, index) => {
        const percentage = (path.matchScore / gameData.questions.length) * 100;
        feedback += `<div class="chart-bar-container" style="--result-index: ${index}">
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

// Add animation to the answer options
function animateAnswerOptions() {
    const options = answerOptions.querySelectorAll('.answer-option');
    options.forEach((option, index) => {
        option.style.setProperty('--option-index', index);
    });
}

// Minigames functionality
function initializeMinigames() {
    const recommendedCareer = getRecommendedCareer();
    
    // Hide all minigames first
    document.querySelectorAll('.minigame-container').forEach(container => {
        container.classList.remove('active');
    });
    
    // Show the minigame related to the recommended career path
    let minigameContainer;
    
    switch(recommendedCareer.id) {
        case 'software-engineering':
            minigameContainer = document.getElementById('software-minigame');
            initSoftwareMinigame();
            break;
        case 'innovative-development':
            minigameContainer = document.getElementById('innovation-minigame');
            initInnovationMinigame();
            break;
        case 'network-systems':
            minigameContainer = document.getElementById('network-minigame');
            initNetworkMinigame();
            break;
        case 'business-data':
            minigameContainer = document.getElementById('data-minigame');
            initDataMinigame();
            break;
        case 'security-management':
            minigameContainer = document.getElementById('security-minigame');
            initSecurityMinigame();
            break;
    }
    
    // Show the corresponding minigame
    if (minigameContainer) {
        minigameContainer.classList.add('active');
    }
}

// Software Engineering Minigame
function initSoftwareMinigame() {
    const codePuzzle = document.getElementById('code-puzzle');
    const codeSolution = document.getElementById('code-solution');
    const checkCodeBtn = document.getElementById('check-code-btn');
    const codeFeedback = document.getElementById('code-feedback');
    
    // Code lines for the puzzle
    const codeLines = [
        'function calculateTotal(items) {',
        '    let total = 0;',
        '    for (let i = 0; i < items.length; i++) {',
        '        total += items[i].price;',
        '    }',
        '    return total;',
        '}'
    ];
    
    // Shuffle code lines
    const shuffledLines = [...codeLines].sort(() => Math.random() - 0.5);
    
    // Create and append code lines to the puzzle container
    codePuzzle.innerHTML = '';
    shuffledLines.forEach(line => {
        const codeLineElem = document.createElement('div');
        codeLineElem.className = 'code-line';
        codeLineElem.textContent = line;
        codeLineElem.draggable = true;
        
        // Add drag events
        codeLineElem.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', line);
            codeLineElem.classList.add('dragging');
        });
        
        codeLineElem.addEventListener('dragend', e => {
            codeLineElem.classList.remove('dragging');
        });
        
        codePuzzle.appendChild(codeLineElem);
    });
    
    // Set up drop zone
    codeSolution.innerHTML = 'Drop code lines here';
    
    codeSolution.addEventListener('dragover', e => {
        e.preventDefault();
        codeSolution.classList.add('hover');
    });
    
    codeSolution.addEventListener('dragleave', () => {
        codeSolution.classList.remove('hover');
    });
    
    codeSolution.addEventListener('drop', e => {
        e.preventDefault();
        codeSolution.classList.remove('hover');
        
        const data = e.dataTransfer.getData('text/plain');
        const draggedElement = Array.from(codePuzzle.children).find(el => el.textContent === data);
        
        if (draggedElement) {
            // Create a new element for the solution area
            const newElement = document.createElement('div');
            newElement.className = 'code-line';
            newElement.textContent = data;
            
            // Clear the drop zone text if it's the first element
            if (codeSolution.textContent === 'Drop code lines here') {
                codeSolution.innerHTML = '';
            }
            
            codeSolution.appendChild(newElement);
            draggedElement.remove();
        }
    });
    
    // Check solution button
    checkCodeBtn.addEventListener('click', () => {
        const solutionLines = Array.from(codeSolution.children).map(line => line.textContent);
        const isCorrect = arraysEqual(solutionLines, codeLines);
        
        if (isCorrect) {
            codeFeedback.textContent = 'Great job! Your code is in the correct order.';
            codeFeedback.className = 'minigame-feedback success';
        } else {
            codeFeedback.textContent = 'Not quite right. Try arranging the code in the correct logical order.';
            codeFeedback.className = 'minigame-feedback error';
        }
    });
}

// Innovative Development Minigame
function initInnovationMinigame() {
    const innovationConcepts = document.getElementById('innovation-concepts');
    const innovationSolution = document.getElementById('innovation-solution');
    const submitInnovationBtn = document.getElementById('submit-innovation-btn');
    const innovationFeedback = document.getElementById('innovation-feedback');
    
    // Concepts for innovation
    const concepts = [
        'Artificial Intelligence', 'Blockchain', 'Cloud Computing',
        'Internet of Things', 'Augmented Reality', 'Mobile Apps',
        'Big Data', 'Social Media', 'Wearable Tech'
    ];
    
    // Create concept cards
    innovationConcepts.innerHTML = '';
    concepts.forEach(concept => {
        const conceptCard = document.createElement('div');
        conceptCard.className = 'innovation-card';
        conceptCard.textContent = concept;
        conceptCard.addEventListener('click', () => {
            // Toggle selection
            if (conceptCard.classList.contains('selected')) {
                conceptCard.classList.remove('selected');
            } else {
                // Limit to 3 selections
                const selectedCards = innovationConcepts.querySelectorAll('.selected');
                if (selectedCards.length < 3) {
                    conceptCard.classList.add('selected');
                }
            }
        });
        
        innovationConcepts.appendChild(conceptCard);
    });
    
    // Submit innovation button
    submitInnovationBtn.addEventListener('click', () => {
        const selectedConcepts = Array.from(innovationConcepts.querySelectorAll('.selected'))
            .map(card => card.textContent);
        
        if (selectedConcepts.length === 3) {
            // Display the selected concepts in the solution area
            innovationSolution.innerHTML = `
                <p>Your Innovation Combines:</p>
                <ul>
                    ${selectedConcepts.map(concept => `<li>${concept}</li>`).join('')}
                </ul>
            `;
            
            // Generate a random "innovation" idea based on the selected concepts
            const ideas = [
                `A ${selectedConcepts[0]} platform that uses ${selectedConcepts[1]} to enhance ${selectedConcepts[2]} experiences`,
                `A new approach to ${selectedConcepts[0]} that leverages ${selectedConcepts[1]} and ${selectedConcepts[2]} for better solutions`,
                `An integrated ${selectedConcepts[0]} system combined with ${selectedConcepts[1]} to solve ${selectedConcepts[2]} challenges`
            ];
            
            const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
            
            innovationFeedback.innerHTML = `
                <p><strong>Your Innovation Idea:</strong></p>
                <p>${randomIdea}</p>
                <p>Creative thinking! This combination could lead to interesting solutions.</p>
            `;
            innovationFeedback.className = 'minigame-feedback success';
        } else {
            innovationFeedback.textContent = 'Please select exactly 3 concepts to combine for your innovation.';
            innovationFeedback.className = 'minigame-feedback error';
        }
    });
}

// Network & Systems Engineering Minigame
function initNetworkMinigame() {
    const networkPuzzle = document.getElementById('network-puzzle');
    const checkNetworkBtn = document.getElementById('check-network-btn');
    const networkFeedback = document.getElementById('network-feedback');
    
    // Network devices
    const devices = [
        { id: 'router', name: 'Router' },
        { id: 'switch', name: 'Switch' },
        { id: 'server', name: 'Server' },
        { id: 'pc1', name: 'PC 1' },
        { id: 'pc2', name: 'PC 2' }
    ];
    
    // Create the network puzzle
    networkPuzzle.innerHTML = '';
    
    // Create device nodes
    const deviceNodesContainer = document.createElement('div');
    deviceNodesContainer.className = 'network-nodes-container';
    
    devices.forEach(device => {
        const node = document.createElement('div');
        node.className = 'network-node';
        node.id = device.id;
        node.textContent = device.name;
        node.dataset.connected = 'false';
        
        node.addEventListener('click', () => {
            node.classList.toggle('selected');
            
            // Check if two nodes are selected
            const selectedNodes = networkPuzzle.querySelectorAll('.network-node.selected');
            if (selectedNodes.length === 2) {
                connectNodes(selectedNodes[0], selectedNodes[1]);
            }
        });
        
        deviceNodesContainer.appendChild(node);
    });
    
    // Create connection lines
    const connectionLinesContainer = document.createElement('div');
    connectionLinesContainer.className = 'connection-lines-container';
    
    const possibleConnections = [
        { from: 'router', to: 'switch', id: 'router-switch', label: 'Network Connection' },
        { from: 'switch', to: 'server', id: 'switch-server', label: 'Server Connection' },
        { from: 'switch', to: 'pc1', id: 'switch-pc1', label: 'PC1 Connection' },
        { from: 'switch', to: 'pc2', id: 'switch-pc2', label: 'PC2 Connection' }
    ];
    
    possibleConnections.forEach(conn => {
        const line = document.createElement('div');
        line.className = 'network-line';
        line.id = conn.id;
        line.innerHTML = `<span>${conn.label}</span>`;
        line.dataset.from = conn.from;
        line.dataset.to = conn.to;
        line.dataset.connected = 'false';
        
        connectionLinesContainer.appendChild(line);
    });
    
    networkPuzzle.appendChild(deviceNodesContainer);
    networkPuzzle.appendChild(connectionLinesContainer);
    
    // Function to connect two nodes
    function connectNodes(node1, node2) {
        const id1 = node1.id;
        const id2 = node2.id;
        
        // Find the connection line
        const connectionId1 = `${id1}-${id2}`;
        const connectionId2 = `${id2}-${id1}`;
        
        const connectionLine = document.getElementById(connectionId1) || document.getElementById(connectionId2);
        
        if (connectionLine) {
            connectionLine.classList.add('connected');
            connectionLine.dataset.connected = 'true';
            
            // Mark the nodes as connected
            node1.dataset.connected = 'true';
            node2.dataset.connected = 'true';
        }
        
        // Clear selection
        node1.classList.remove('selected');
        node2.classList.remove('selected');
    }
    
    // Check network button
    checkNetworkBtn.addEventListener('click', () => {
        const connectedLines = connectionLinesContainer.querySelectorAll('.network-line[data-connected="true"]');
        
        if (connectedLines.length === possibleConnections.length) {
            networkFeedback.innerHTML = `
                <p>Great job! You've successfully connected all devices in the network.</p>
                <p>This is a star topology with the switch at the center, which is commonly used in office networks.</p>
            `;
            networkFeedback.className = 'minigame-feedback success';
        } else {
            networkFeedback.innerHTML = `
                <p>Your network is incomplete. You need to connect all devices to create a working network.</p>
                <p>You've made ${connectedLines.length} of ${possibleConnections.length} required connections.</p>
            `;
            networkFeedback.className = 'minigame-feedback error';
        }
    });
}

// Business & Data Management Minigame
function initDataMinigame() {
    const dataItems = document.getElementById('data-items');
    const structuredData = document.getElementById('structured-data');
    const unstructuredData = document.getElementById('unstructured-data');
    const checkDataBtn = document.getElementById('check-data-btn');
    const dataFeedback = document.getElementById('data-feedback');
    
    // Data examples
    const data = [
        { text: 'SQL Database Records', type: 'structured' },
        { text: 'Excel Spreadsheet', type: 'structured' },
        { text: 'CSV File', type: 'structured' },
        { text: 'JSON Data', type: 'structured' },
        { text: 'XML Document', type: 'structured' },
        { text: 'Email Text', type: 'unstructured' },
        { text: 'Social Media Posts', type: 'unstructured' },
        { text: 'PDF Document', type: 'unstructured' },
        { text: 'Audio Recording', type: 'unstructured' },
        { text: 'Video Content', type: 'unstructured' }
    ];
    
    // Shuffle data
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    
    // Create data cards
    dataItems.innerHTML = '';
    shuffledData.forEach(item => {
        const dataCard = document.createElement('div');
        dataCard.className = 'data-card';
        dataCard.textContent = item.text;
        dataCard.dataset.type = item.type;
        dataCard.draggable = true;
        
        // Add drag events
        dataCard.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', JSON.stringify(item));
            dataCard.classList.add('dragging');
        });
        
        dataCard.addEventListener('dragend', () => {
            dataCard.classList.remove('dragging');
        });
        
        dataItems.appendChild(dataCard);
    });
    
    // Set up drop zones
    [structuredData, unstructuredData].forEach(dropZone => {
        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            dropZone.classList.add('hover');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('hover');
        });
        
        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            dropZone.classList.remove('hover');
            
            try {
                const item = JSON.parse(e.dataTransfer.getData('text/plain'));
                const draggedElement = Array.from(dataItems.children).find(el => 
                    el.textContent === item.text && el.dataset.type === item.type);
                
                if (draggedElement) {
                    const newElement = document.createElement('div');
                    newElement.className = 'data-card';
                    newElement.textContent = item.text;
                    newElement.dataset.type = item.type;
                    
                    dropZone.appendChild(newElement);
                    draggedElement.remove();
                }
            } catch (err) {
                console.error('Error parsing dragged data:', err);
            }
        });
    });
    
    // Check data sorting button
    checkDataBtn.addEventListener('click', () => {
        const structuredItems = Array.from(structuredData.querySelectorAll('.data-card'));
        const unstructuredItems = Array.from(unstructuredData.querySelectorAll('.data-card'));
        
        let correctCount = 0;
        let totalItems = structuredItems.length + unstructuredItems.length;
        
        structuredItems.forEach(item => {
            if (item.dataset.type === 'structured') {
                correctCount++;
            }
        });
        
        unstructuredItems.forEach(item => {
            if (item.dataset.type === 'unstructured') {
                correctCount++;
            }
        });
        
        if (totalItems === 0) {
            dataFeedback.textContent = 'Please sort some data items first.';
            dataFeedback.className = 'minigame-feedback error';
        } else if (correctCount === totalItems) {
            dataFeedback.innerHTML = `
                <p>Perfect! You've correctly sorted all ${totalItems} data items.</p>
                <p>Understanding the difference between structured and unstructured data is key for effective data management.</p>
            `;
            dataFeedback.className = 'minigame-feedback success';
        } else {
            const accuracy = Math.round((correctCount / totalItems) * 100);
            dataFeedback.innerHTML = `
                <p>You got ${correctCount} out of ${totalItems} items correct (${accuracy}% accuracy).</p>
                <p>Remember: Structured data fits into predefined formats and databases, while unstructured data is more free-form.</p>
            `;
            dataFeedback.className = 'minigame-feedback error';
        }
    });
}

// Security Management Minigame
function initSecurityMinigame() {
    const securityItems = document.getElementById('security-items');
    const checkSecurityBtn = document.getElementById('check-security-btn');
    const securityFeedback = document.getElementById('security-feedback');
    
    // Security scenarios
    const securityScenarios = [
        { text: 'Login form without HTTPS encryption', isVulnerable: true },
        { text: 'Password stored as plain text in database', isVulnerable: true },
        { text: 'Form without input validation', isVulnerable: true },
        { text: 'Software with default admin credentials', isVulnerable: true },
        { text: 'Public WiFi without a password', isVulnerable: true },
        { text: 'Two-factor authentication for login', isVulnerable: false },
        { text: 'Regular security updates', isVulnerable: false },
        { text: 'Password hashing with salt', isVulnerable: false },
        { text: 'Data backups stored offline', isVulnerable: false },
        { text: 'Network with firewall protection', isVulnerable: false }
    ];
    
    // Shuffle scenarios
    const shuffledScenarios = [...securityScenarios].sort(() => Math.random() - 0.5);
    
    // Create security items
    securityItems.innerHTML = '';
    shuffledScenarios.forEach(scenario => {
        const item = document.createElement('div');
        item.className = 'security-item';
        if (scenario.isVulnerable) {
            item.classList.add('vulnerable');
        }
        item.textContent = scenario.text;
        item.dataset.vulnerable = scenario.isVulnerable;
        
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
        
        securityItems.appendChild(item);
    });
    
    // Check security button
    checkSecurityBtn.addEventListener('click', () => {
        const selectedItems = securityItems.querySelectorAll('.security-item.selected');
        const vulnerableItems = securityItems.querySelectorAll('.security-item.vulnerable');
        
        let correctSelections = 0;
        let incorrectSelections = 0;
        
        selectedItems.forEach(item => {
            if (item.dataset.vulnerable === 'true') {
                correctSelections++;
                item.classList.add('correct');
            } else {
                incorrectSelections++;
            }
        });
        
        const vulnerableCount = vulnerableItems.length;
        const missedVulnerabilities = vulnerableCount - correctSelections;
        
        if (selectedItems.length === 0) {
            securityFeedback.textContent = 'Please select the items you think are security vulnerabilities.';
            securityFeedback.className = 'minigame-feedback error';
        } else if (correctSelections === vulnerableCount && incorrectSelections === 0) {
            securityFeedback.innerHTML = `
                <p>Excellent! You identified all ${vulnerableCount} security vulnerabilities correctly.</p>
                <p>You have a great eye for security issues!</p>
            `;
            securityFeedback.className = 'minigame-feedback success';
        } else {
            securityFeedback.innerHTML = `
                <p>You found ${correctSelections} out of ${vulnerableCount} vulnerabilities.</p>
                <p>You missed ${missedVulnerabilities} vulnerabilities and incorrectly selected ${incorrectSelections} secure items.</p>
                <p>Security experts need to be able to identify all potential security risks.</p>
            `;
            securityFeedback.className = 'minigame-feedback error';
            
            // Highlight missed vulnerabilities
            vulnerableItems.forEach(item => {
                if (!item.classList.contains('selected')) {
                    item.classList.add('vulnerable');
                }
            });
        }
    });
}

// Helper function to compare arrays
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
} 