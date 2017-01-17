export const USER_RESPONSES = 'USER_RESPONSES';
export const FETCH_QUESTION = 'FETCH_QUESTION';

export function received() {
  return {
    type: FETCH_QUESTION,
  };
}
export function userResponse(response) {
  // for collecting information of the user to store in schema
  return {
    type: USER_RESPONSES,
    response,
  };
}

