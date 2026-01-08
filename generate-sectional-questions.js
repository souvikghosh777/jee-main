const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

// Helper to generate questions
function generateQuestions(section, count, startId) {
  const questions = [];
  const types = ['MCQ', 'Numerical'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const type = i % 5 === 0 ? 'Numerical' : 'MCQ';
    const difficulty = difficulties[i % 3];
    
    if (type === 'MCQ') {
      questions.push({
        id,
        section,
        type,
        difficulty,
        question: `Sample ${section} question ${id} - ${difficulty} level MCQ`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        solution: `This is the solution for question ${id}. The correct answer is Option A because...`
      });
    } else {
      questions.push({
        id,
        section,
        type,
        difficulty,
        question: `Sample ${section} question ${id} - ${difficulty} level Numerical`,
        correctAnswer: String(Math.floor(Math.random() * 100)),
        solution: `This is the solution for question ${id}. Calculate using the given formula...`
      });
    }
  }
  return questions;
}

// Find sectional tests and add questions
const physicsTest = data.tests.find(t => t.id === 'sectional-physics-1');
const chemTest = data.tests.find(t => t.id === 'sectional-chemistry-1');
const mathTest = data.tests.find(t => t.id === 'sectional-mathematics-1');

if (physicsTest) physicsTest.questions = generateQuestions('Physics', 200, 1);
if (chemTest) chemTest.questions = generateQuestions('Chemistry', 200, 1);
if (mathTest) mathTest.questions = generateQuestions('Mathematics', 200, 1);

fs.writeFileSync('src/data/questions.json', JSON.stringify(data, null, 2));
console.log('Added 200 questions to each sectional test!');
console.log('Total questions generated:', 600);
