
export type Question = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    answers: string[]; 
  };
  
  export type QuestionState = Question & { answers: string[] };
  
  export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
  };
  
  export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
  
    return data.results.map((question: any) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    }));
  };
  
  export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);
  