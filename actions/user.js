export const USER = 'USER';

export function sendUser(user) {
  return {
    type: USER,
    user,
  };
}

