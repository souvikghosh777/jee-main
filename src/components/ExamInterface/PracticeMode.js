import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questionsData from '../../data/questions.json';

function PracticeMode() {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [progress, setProgress] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0
  });

  useEffect(() => {
    // Load questions
    if (questionsData && questionsData.tests) {
      const test = questionsData.tests.find(t => t.id === testId);
      if (test) {
        setQuestions(test.questions || []);
      }
    }
  }, [testId]);

  const currentQuestion = questions[currentIndex];

  const handleSubmitAnswer = () => {
    if (!userAnswer) {
      alert('Please select/enter an answer first');
      return;
    }
    
    const isCorrect = userAnswer === currentQuestion.correctAnswer;
    
    setAnswered(true);
    setShowSolution(true);
    
    setProgress(prev => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowSolution(false);
      setAnswered(false);
    } else {
      // Show final summary
      alert(`Practice Complete!\nCorrect: ${progress.correct}\nIncorrect: ${progress.incorrect}\nTotal: ${questions.length}`);
      navigate('/tests');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer('');
      setShowSolution(false);
      setAnswered(false);
    }
  };

  const handleSkip = () => {
    setProgress(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }));
    handleNext();
  };

  if (!currentQuestion) {
    return <div className="practice-loading">Loading questions...</div>;
  }

  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  return (
    <div className="practice-mode-container">
      {/* Header */}
      <div className="practice-header">
        <div className="practice-progress">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${((currentIndex + 1) / questions.length) * 100}%`}}
            ></div>
          </div>
        </div>
        <div className="practice-stats">
          <span className="stat-correct">✓ {progress.correct}</span>
          <span className="stat-incorrect">✗ {progress.incorrect}</span>
          <span className="stat-skipped">⊘ {progress.skipped}</span>
        </div>
        <button onClick={() => navigate('/tests')} className="btn-exit">Exit</button>
      </div>

      {/* Question Content */}
      <div className="practice-content">
        <div className="practice-question-card">
          {/* Question Header */}
          <div className="practice-question-header">
            <div className="practice-question-number">Question {currentIndex + 1} of {questions.length}</div>
            <div className="practice-question-badges">
              <span className="badge badge-primary">{currentQuestion.section}</span>
              <span className="question-type-badge">{currentQuestion.type}</span>
              <span className={`badge badge-${currentQuestion.difficulty.toLowerCase() === 'easy' ? 'success' : currentQuestion.difficulty.toLowerCase() === 'medium' ? 'warning' : 'danger'}`}>
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="practice-question-text">
            {currentQuestion.question}
          </div>

          {/* MCQ Options */}
          {currentQuestion.type === 'MCQ' && (
            <div className="options-list">
              {currentQuestion.options.map((option, index) => {
                let optionClass = 'option';
                if (showSolution) {
                  if (option === currentQuestion.correctAnswer) {
                    optionClass += ' correct';
                  } else if (option === userAnswer && option !== currentQuestion.correctAnswer) {
                    optionClass += ' incorrect';
                  }
                } else if (option === userAnswer) {
                  optionClass += ' selected';
                }

                return (
                  <div
                    key={index}
                    className={optionClass}
                    onClick={() => !answered && setUserAnswer(option)}
                  >
                    <span className="option-label">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                    {showSolution && option === currentQuestion.correctAnswer && (
                      <span className="correct-icon">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Numerical Input */}
          {currentQuestion.type === 'Numerical' && (
            <div className="numerical-input-box">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => !answered && setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                disabled={answered}
                className="numerical-input"
              />
              {showSolution && (
                <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                  Correct Answer: {currentQuestion.correctAnswer}
                </div>
              )}
            </div>
          )}

          {/* Solution Section */}
          {showSolution && (
            <div className={`solution-box ${isCorrect ? 'correct-solution' : 'incorrect-solution'}`}>
              <div className="solution-header">
                <h4>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h4>
              </div>
              <div className="solution-content">
                <p><strong>Solution:</strong></p>
                <p>{currentQuestion.solution}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              onClick={handlePrevious} 
              disabled={currentIndex === 0}
              className="btn btn-secondary"
            >
              ← Previous
            </button>
            
            {!answered ? (
              <>
                <button onClick={handleSubmitAnswer} className="btn btn-primary">
                  Check Answer
                </button>
                <button onClick={handleSkip} className="btn btn-outline">
                  Skip
                </button>
              </>
            ) : (
              <button onClick={handleNext} className="btn btn-success">
                {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish Practice'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeMode;
