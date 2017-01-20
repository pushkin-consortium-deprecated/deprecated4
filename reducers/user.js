import {
  USER,
} from '../actions/user';

export default function getUser(state = {}, action) {
  switch (action.type) {
    case USER: {
      const user = action.user;
      return {
        ...state,
        id: user.id,
        name: user.name,
      };
    }
    default:
      return state;
  }
}
