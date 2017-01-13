export const USER_RESPONSES = 'USER_RESPONSES';
export const FETCH_QUESTION = "FETCH_QUESTION";

export function fetchQuestion() {
  return {
    type: FETCH_QUESTION
  }
}
export function userResponse(response) {
  return {
    type: USER_RESPONSES,
    response,
  };
}

