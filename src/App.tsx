import React, { useState, useEffect } from 'react';
import QuestionsCard from './components/QuestionsCard';
import { fetchQuizQuestions, Difficulty } from './Api';
import './App.css';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    if (!gameOver && userAnswers.length === TOTAL_QUESTIONS) {
      showResults();
    }
  }, [userAnswers, gameOver]);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore(score + 1);
      }
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestionNumber = number + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestionNumber);
    }
  };

  const showResults = () => {
    setModalOpen(true);
  };

  const closeResults = () => {
    setModalOpen(false);
  };

  return (
    <div className='App'>
      <h1>React Quiz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button className='startTrivia' onClick={startTrivia}>
          Start
        </button>
      )}
      {!gameOver && <p className='score'>Score: {score}</p>}
      {loading && <p>Loading questions...</p>}
      {!loading && !gameOver && (
        <QuestionsCard
          questionsNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
        <button className='next' onClick={nextQuestion} disabled={!userAnswers[number]}>
          Next Question
        </button>
      )}
      {gameOver && userAnswers.length === TOTAL_QUESTIONS && (
        <button className='showResults' onClick={showResults}>
          Show Results
        </button>
      )}
      {modalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeResults}>&times;</span>
            <p>Your Score: {score} / {TOTAL_QUESTIONS}</p>
            <p>Thank you for playing!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
