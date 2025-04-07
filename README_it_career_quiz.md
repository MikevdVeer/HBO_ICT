# IT Career Path Quiz - HBO-ICT

## Overview

This IT Career Path Quiz helps students discover which IT specialization might be the best fit for them based on their interests, preferences, and strengths. The quiz presents a series of questions about preferences, problem-solving approaches, and interests, and then recommends one of five IT career paths:

1. **Software Engineering**
2. **Innovative Development**
3. **Network & Systems Engineering**
4. **Business & Data Management**
5. **Security Management**

After completing the quiz, users receive a personalized recommendation and a visualization of how they scored across all five career paths. The results are also saved as a JSON file for future reference.

## Features

- 5 carefully crafted questions to determine IT career path suitability
- Option to provide personal explanations for each answer to improve accuracy
- Visual score display showing match percentage for each career path
- Automatic saving of results to a JSON file
- Responsive design that works on desktop and mobile devices

## How It Works

The quiz analyzes user responses by mapping each answer option to a specific IT career path. When a user selects an option related to a certain career path, the score for that path increases. 

For example, if a user consistently selects answers related to coding and software development, their Software Engineering score will be higher. The career path with the highest score becomes the recommended path.

The addition of personal explanations allows the system to capture qualitative information that helps validate the quantitative scoring.

## How to Use

1. Open the application in a web browser
2. Click "Start Challenge" on the main screen
3. Answer each question by selecting the option that best describes you
4. Provide a brief explanation for your answer when prompted
5. After answering all questions, review your results
6. Download the JSON file with your results for future reference
7. Use the "Back to Menu" button to restart the quiz if desired

## Adding or Modifying Questions

To customize the quiz by adding or changing questions:

1. Open the `js/game.js` file
2. Locate the `gameData.questions` array
3. Add a new question object or modify existing ones following this format:

```javascript
{
    text: "Your question text here?",
    options: [
        "Option 1 (related to Software Engineering)",
        "Option 2 (related to Innovative Development)",
        "Option 3 (related to Network & Systems Engineering)",
        "Option 4 (related to Business & Data Management)",
        "Option 5 (related to Security Management)"
    ],
    requiresExplanation: true,
    explanationPlaceholder: "Prompt for explanation",
    careerPathIndex: [0, 1, 2, 3, 4] // Maps each option to a career path
}
```

The `careerPathIndex` array maps each option to the corresponding index in the `careerPaths` array.

## JSON Result Format

The JSON file contains:

- All user answers with questions, selected options, and explanations
- The recommended career path
- Scores for all career paths

Example:
```json
{
  "answers": [
    {
      "question": "Which activity do you enjoy the most?",
      "answer": "Writing code and creating software applications",
      "explanation": "I enjoy the logical thinking and problem-solving aspects of coding."
    },
    ...
  ],
  "recommendedCareer": {
    "id": "software-engineering",
    "title": "Software Engineering",
    "description": "Your responses indicate you would excel in Software Engineering...",
    "matchScore": 4
  },
  "allCareerScores": [
    {
      "career": "Software Engineering",
      "score": 4
    },
    {
      "career": "Innovative Development",
      "score": 1
    },
    ...
  ]
}
```

## Implementation Details

The quiz is implemented using vanilla JavaScript, HTML, and CSS, with no external dependencies. The core functionality is in the following files:

- `index.html` - Main structure of the application
- `js/game.js` - Quiz logic and functionality
- `css/style.css` - Styling for the application 