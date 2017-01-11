export default function userInfo(state = { gender: null, age: null }, action) {
  switch (action.type) {
    case 'USER_INFO': {
      return {
        ...state,
        gender: action.info.gender,
        age: action.info.age,
        takenBefore: action.info.takenBefore,
        languageDisorder: action.info.languageDisorder,
        education: action.info.education,
      };
    }
    default:
      return state;
  }
}
