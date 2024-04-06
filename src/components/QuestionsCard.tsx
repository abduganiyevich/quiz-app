import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionsNum: number;
  totalQuestions: number;
};

const QuestionsCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionsNum, totalQuestions }) => {
  return (
    <div className='questions-card'>
      <p className='number'>{questionsNum} / {totalQuestions}</p>
      <div className='questions'>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      </div>
      <div className='btn-wrapper'>
        {answers.map((answer, index) => (
           <div key={index} >
            <button
              disabled={!!userAnswer}
              value={answer}
              onClick={(e) => callback(e)}
              className={
                userAnswer
                  ? userAnswer.correctAnswer === answer
                    ? 'correct'
                    : answer === userAnswer.answer
                      ? 'incorrect'
                      : ''
                  : ''
              }
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionsCard;
