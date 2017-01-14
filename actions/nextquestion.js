export const NEXT_QUESTION = 'NEXT_QUESTION';

export function nextQuestion(question) {
  console.log("i'm in action question, i'm getting called", question)
  return {
    type: NEXT_QUESTION,
    question,
  };
}

