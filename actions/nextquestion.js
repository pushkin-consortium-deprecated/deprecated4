export const NEXT_QUESTION = 'NEXT_QUESTION';

export function nextQuestion(question) {
  return {
    type: NEXT_QUESTION,
    question,
  };
}

