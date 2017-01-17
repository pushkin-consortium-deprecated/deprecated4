export const USER_INFO = 'USER_INFO';

export function userInfo(info) {
  return {
    type: USER_INFO,
    info,
  };
}

