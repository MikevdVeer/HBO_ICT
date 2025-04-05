// Game data - questions, answers, and minigames for each level
const gameData = {
    level1: {
        title: "Level 1: HBO-ICT Basics",
        questions: [
            {
                text: "Which of these is NOT one of the HBO-ICT specializations at De Haagse Hogeschool?",
                options: ["Software Engineering", "Information Security Management", "Network & Systems Engineering", "Artificial Intelligence Engineering"],
                correctAnswer: 3
            },
            {
                text: "In which cities does De Haagse Hogeschool offer the HBO-ICT program?",
                options: ["Den Haag only", "Den Haag and Delft", "Den Haag, Delft, and Zoetermeer", "Den Haag, Delft, Zoetermeer, and Rotterdam"],
                correctAnswer: 2
            },
            {
                text: "How long does the HBO-ICT bachelor program typically take?",
                options: ["3 years", "4 years", "5 years", "2 years"],
                correctAnswer: 1
            }
        ],
        minigame: {
            type: "typing",
            instructions: "Type the code as fast as you can to demonstrate your programming skills needed for HBO-ICT!",
            content: "function deHaagseICT() { console.log('Welcome to HBO-ICT at De Haagse Hogeschool!'); }"
        }
    },
    level2: {
        title: "Level 2: HBO-ICT Specializations",
        questions: [
            {
                text: "Which HBO-ICT specialization focuses on creating databases and helping businesses make decisions based on data?",
                options: ["Software Engineering", "Business & Data Management", "Innovative Development", "Network & Systems Engineering"],
                correctAnswer: 1
            },
            {
                text: "Which HBO-ICT specialization is located in Delft?",
                options: ["Software Engineering", "Business & Data Management", "Innovative Development", "Network & Systems Engineering"],
                correctAnswer: 3
            },
            {
                text: "In which year of the HBO-ICT program do you choose your specialization?",
                options: ["Before starting", "First year (after first semester)", "Second year", "Third year"],
                correctAnswer: 1
            }
        ],
        minigame: {
            type: "memory",
            instructions: "Remember the pattern to show your memory skills needed for learning programming concepts at HBO-ICT!",
            gridSize: 3
        }
    },
    level3: {
        title: "Level 3: HBO-ICT Career Paths",
        questions: [
            {
                text: "Which of these is mentioned as a potential career after completing HBO-ICT?",
                options: ["Microbiologist", "Software Developer", "Civil Engineer", "Financial Advisor"],
                correctAnswer: 1
            },
            {
                text: "How many EC (European Credits) do you need to achieve in the first year to receive a positive study advice (BSA)?",
                options: ["30 EC", "45 EC", "50 EC", "60 EC"],
                correctAnswer: 2
            },
            {
                text: "Which of these is a key focus area of the Innovative Development specialization at HBO-ICT?",
                options: [
                    "Maintaining legacy systems",
                    "Finding new, innovative solutions outside the box",
                    "Focusing on theoretical computer science concepts",
                    "Researching quantum computing"
                ],
                correctAnswer: 1
            }
        ],
        minigame: {
            type: "puzzle",
            instructions: "Arrange the code blocks to create a working function like you would in your HBO-ICT projects!",
            blocks: [
                "function calculateGrade(scores) {",
                "  const sum = scores.reduce((total, score) => total + score, 0);",
                "  return sum / scores.length;",
                "}"
            ]
        }
    }
};

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

// Game state
let currentLevel = null;
let currentQuestionIndex = 0;
let score = 0;
let questionScore = 0;
let minigameScore = 0;

// DOM Elements
const mainMenu = document.getElementById('main-menu');
const levelSelect = document.getElementById('level-select');
const gameScreen = document.getElementById('game-screen');
const levelComplete = document.getElementById('level-complete');
const levelTitle = document.getElementById('level-title');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const minigameContainer = document.getElementById('minigame-container');
const progressFill = document.getElementById('progress-fill');
const scoreDisplay = document.getElementById('score-display');
const feedbackElem = document.getElementById('feedback');

// Event Listeners
document.getElementById('start-button').addEventListener('click', showLevelSelect);
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', handleBackButton);
});
document.querySelectorAll('.level-button').forEach(button => {
    button.addEventListener('click', () => {
        startLevel(button.getAttribute('data-level'));
    });
});
document.getElementById('next-level-button').addEventListener('click', handleNextLevel);

// Initialize logo
document.addEventListener('DOMContentLoaded', createLogo);

// Navigation Functions
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function showLevelSelect() {
    showScreen(levelSelect);
}

function handleBackButton(e) {
    const currentScreen = e.target.closest('.screen');
    
    if (currentScreen === gameScreen) {
        showLevelSelect();
    } else if (currentScreen === levelSelect) {
        showScreen(mainMenu);
    } else if (currentScreen === levelComplete) {
        showLevelSelect();
    }
}

function handleNextLevel() {
    if (currentLevel < 3) {
        startLevel(parseInt(currentLevel) + 1);
    } else {
        showLevelSelect();
    }
}

// Game Functions
function startLevel(levelNum) {
    currentLevel = levelNum;
    currentQuestionIndex = 0;
    score = 0;
    questionScore = 0;
    minigameScore = 0;
    
    const levelData = gameData[`level${levelNum}`];
    levelTitle.textContent = levelData.title;
    
    // Reset UI
    minigameContainer.innerHTML = '';
    updateProgressBar();
    
    // Start with first question
    showQuestion();
    showScreen(gameScreen);
}

function showQuestion() {
    const levelData = gameData[`level${currentLevel}`];
    const question = levelData.questions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = question.text;
    
    // Clear and create answer options
    answerOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(index));
        answerOptions.appendChild(optionElement);
    });
    
    // Show question container, hide minigame
    document.getElementById('question-container').style.display = 'block';
    minigameContainer.style.display = 'none';
    
    updateProgressBar();
}

function checkAnswer(selectedIndex) {
    const levelData = gameData[`level${currentLevel}`];
    const question = levelData.questions[currentQuestionIndex];
    
    // Get all answer options
    const options = answerOptions.querySelectorAll('.answer-option');
    
    // Highlight correct and incorrect answers
    options.forEach((option, index) => {
        option.classList.remove('correct', 'incorrect');
        
        // Add appropriate class
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
        
        // Disable clicking on options
        option.style.pointerEvents = 'none';
    });
    
    // Award points if correct
    if (selectedIndex === question.correctAnswer) {
        questionScore += 100;
    }
    
    // Move to next question or minigame after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < levelData.questions.length) {
            showQuestion();
        } else {
            startMinigame();
        }
    }, 1500);
}

function startMinigame() {
    const levelData = gameData[`level${currentLevel}`];
    const minigame = levelData.minigame;
    
    // Hide question container, show minigame
    document.getElementById('question-container').style.display = 'none';
    minigameContainer.style.display = 'block';
    
    // Clear minigame container
    minigameContainer.innerHTML = '';
    
    // Add instructions
    const instructions = document.createElement('div');
    instructions.className = 'minigame-instructions';
    instructions.textContent = minigame.instructions;
    minigameContainer.appendChild(instructions);
    
    // Initialize minigame based on type
    switch (minigame.type) {
        case 'typing':
            createTypingGame(minigame);
            break;
        case 'memory':
            createMemoryGame(minigame);
            break;
        case 'puzzle':
            createPuzzleGame(minigame);
            break;
    }
    
    updateProgressBar();
}

function createTypingGame(minigame) {
    // Create typing game UI
    const gameArea = document.createElement('div');
    gameArea.className = 'typing-game';
    
    const codeDisplay = document.createElement('div');
    codeDisplay.className = 'code-display';
    codeDisplay.textContent = minigame.content;
    
    const codeInput = document.createElement('textarea');
    codeInput.className = 'code-input';
    codeInput.placeholder = 'Type the code here...';
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => {
        // Calculate accuracy
        const userInput = codeInput.value;
        const targetCode = minigame.content;
        const accuracy = calculateAccuracy(userInput, targetCode);
        
        // Award points based on accuracy
        minigameScore = Math.round(accuracy * 300);
        
        // Complete level
        completeLevel();
    });
    
    gameArea.appendChild(codeDisplay);
    gameArea.appendChild(codeInput);
    gameArea.appendChild(submitButton);
    
    minigameContainer.appendChild(gameArea);
}

function createMemoryGame(minigame) {
    // Create memory game UI
    const gameArea = document.createElement('div');
    gameArea.className = 'memory-game';
    
    const gridSize = minigame.gridSize;
    const grid = document.createElement('div');
    grid.className = 'memory-grid';
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    // Generate random pattern
    const pattern = [];
    for (let i = 0; i < gridSize * 2; i++) {
        pattern.push(Math.floor(Math.random() * (gridSize * gridSize)));
    }
    
    // Create grid cells
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'memory-cell';
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
    
    gameArea.appendChild(grid);
    
    // Add start button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Pattern';
    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        
        // Show pattern
        let patternIndex = 0;
        const interval = setInterval(() => {
            const cells = grid.querySelectorAll('.memory-cell');
            
            // Reset previous highlight
            cells.forEach(cell => cell.classList.remove('highlight'));
            
            if (patternIndex < pattern.length) {
                // Highlight next cell in pattern
                cells[pattern[patternIndex]].classList.add('highlight');
                patternIndex++;
            } else {
                // Pattern complete, allow user input
                clearInterval(interval);
                startUserInput();
            }
        }, 1000);
        
        function startUserInput() {
            // Reset cells
            const cells = grid.querySelectorAll('.memory-cell');
            cells.forEach(cell => {
                cell.classList.remove('highlight');
                
                // Enable clicking
                cell.addEventListener('click', handleClick);
            });
            
            // Create submit button
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit Pattern';
            submitButton.addEventListener('click', () => {
                // Compare patterns
                const userPattern = Array.from(grid.querySelectorAll('.user-selected'))
                    .map(cell => parseInt(cell.dataset.index));
                
                // Calculate score based on correct selections
                let correctCells = 0;
                for (let i = 0; i < Math.min(userPattern.length, pattern.length); i++) {
                    if (userPattern[i] === pattern[i]) {
                        correctCells++;
                    }
                }
                
                const accuracy = correctCells / pattern.length;
                minigameScore = Math.round(accuracy * 300);
                
                // Complete level
                completeLevel();
            });
            
            gameArea.appendChild(submitButton);
        }
        
        function handleClick(e) {
            const cell = e.target;
            cell.classList.toggle('user-selected');
        }
    });
    
    gameArea.appendChild(startButton);
    minigameContainer.appendChild(gameArea);
}

function createPuzzleGame(minigame) {
    // Create puzzle game UI
    const gameArea = document.createElement('div');
    gameArea.className = 'puzzle-game';
    
    // Shuffle code blocks
    const shuffledBlocks = [...minigame.blocks];
    for (let i = shuffledBlocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledBlocks[i], shuffledBlocks[j]] = [shuffledBlocks[j], shuffledBlocks[i]];
    }
    
    // Create draggable blocks
    const blockContainer = document.createElement('div');
    blockContainer.className = 'code-blocks';
    
    shuffledBlocks.forEach((block, index) => {
        const blockElem = document.createElement('div');
        blockElem.className = 'code-block';
        blockElem.textContent = block;
        blockElem.draggable = true;
        blockElem.dataset.index = index;
        
        // Add drag events
        blockElem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
            setTimeout(() => blockElem.classList.add('dragging'), 0);
        });
        
        blockElem.addEventListener('dragend', () => {
            blockElem.classList.remove('dragging');
        });
        
        blockContainer.appendChild(blockElem);
    });
    
    // Create drop zone
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const blockIndex = e.dataTransfer.getData('text/plain');
        const block = document.querySelector(`.code-block[data-index="${blockIndex}"]`);
        
        // Move block to drop zone
        dropZone.appendChild(block);
    });
    
    // Add submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Solution';
    submitButton.addEventListener('click', () => {
        // Get user's arrangement
        const userArrangement = Array.from(dropZone.querySelectorAll('.code-block'))
            .map(block => block.textContent);
        
        // Calculate score based on correct order
        let correctBlocks = 0;
        for (let i = 0; i < Math.min(userArrangement.length, minigame.blocks.length); i++) {
            if (userArrangement[i] === minigame.blocks[i]) {
                correctBlocks++;
            }
        }
        
        const accuracy = correctBlocks / minigame.blocks.length;
        minigameScore = Math.round(accuracy * 300);
        
        // Complete level
        completeLevel();
    });
    
    gameArea.appendChild(blockContainer);
    gameArea.appendChild(dropZone);
    gameArea.appendChild(submitButton);
    
    minigameContainer.appendChild(gameArea);
}

function calculateAccuracy(userInput, targetText) {
    let correctChars = 0;
    const maxLength = Math.max(userInput.length, targetText.length);
    
    for (let i = 0; i < Math.min(userInput.length, targetText.length); i++) {
        if (userInput[i] === targetText[i]) {
            correctChars++;
        }
    }
    
    return correctChars / maxLength;
}

function completeLevel() {
    // Calculate total score
    score = questionScore + minigameScore;
    
    // Update UI
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Generate feedback based on score
    let feedback = '';
    if (score >= 500) {
        feedback = `Excellent! You've shown great skills in ${gameData[`level${currentLevel}`].title}. You would be a perfect fit for the HBO-ICT program at De Haagse Hogeschool!`;
    } else if (score >= 300) {
        feedback = `Good job! You have solid potential for the HBO-ICT program at De Haagse Hogeschool. With some preparation, you could excel in this field!`;
    } else {
        feedback = `You've completed the level, but may need more practice with ${gameData[`level${currentLevel}`].title}. Consider exploring the HBO-ICT program further to see if it's right for you!`;
    }
    
    feedbackElem.textContent = feedback;
    
    // Show level complete screen
    showScreen(levelComplete);
    
    // Update next level button
    if (currentLevel == 3) {
        document.getElementById('next-level-button').textContent = 'Finish Game';
    } else {
        document.getElementById('next-level-button').textContent = 'Next Level';
    }
}

function updateProgressBar() {
    const levelData = gameData[`level${currentLevel}`];
    const totalSteps = levelData.questions.length + 1; // questions + minigame
    const currentStep = currentQuestionIndex < levelData.questions.length ? currentQuestionIndex : totalSteps - 1;
    
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progressPercentage}%`;
}

// Add CSS for minigames
const minigameStyles = document.createElement('style');
minigameStyles.textContent = `
    .minigame-instructions {
        margin-bottom: 20px;
        font-size: 1.2rem;
        color: #2c3e50;
    }
    
    /* Typing Game */
    .typing-game {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    
    .code-display {
        background-color: #34495e;
        color: #ecf0f1;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        margin-bottom: 10px;
    }
    
    .code-input {
        width: 100%;
        height: 100px;
        padding: 10px;
        margin-bottom: 10px;
        font-family: monospace;
        resize: none;
    }
    
    /* Memory Game */
    .memory-game {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .memory-grid {
        display: grid;
        grid-gap: 10px;
        width: 300px;
        height: 300px;
        margin-bottom: 20px;
    }
    
    .memory-cell {
        background-color: #3498db;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .memory-cell.highlight {
        background-color: #f1c40f;
    }
    
    .memory-cell.user-selected {
        background-color: #e74c3c;
    }
    
    /* Puzzle Game */
    .puzzle-game {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    
    .code-blocks {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    
    .code-block {
        background-color: #3498db;
        color: white;
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
        cursor: grab;
    }
    
    .code-block.dragging {
        opacity: 0.5;
    }
    
    .drop-zone {
        min-height: 150px;
        background-color: #ecf0f1;
        border: 2px dashed #bdc3c7;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 20px;
    }
    
    .drop-zone .code-block {
        background-color: #2ecc71;
    }
`;

document.head.appendChild(minigameStyles); 