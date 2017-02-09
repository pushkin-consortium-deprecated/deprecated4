import local from './axiosConfigInitial';
import { error } from './error';
import  { requestQuestionBegin } from './fetch';

export const FETCHING_LIST = 'FETCHING_LIST';
export const BUILD_INITIAL = 'BUILD_INITIAL';

function buildInitial(list) {
  return {
    type: BUILD_INITIAL,
    list,
  }
}
export function questionList() {
  return (dispatch, getState) => {
    dispatch(requestQuestionBegin());
    return local.get('initialQuestions')
    .then((resp) => {
      if (resp.error) {
        return dispatch(error(resp.error));
      }
      dispatch(buildInitial(resp.data.questions));
      return resp.data;
    })
    .catch((err) => {
      return dispatch(error(err));
    });
  };
}
