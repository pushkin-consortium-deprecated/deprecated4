export const USER_INFO = 'USER_INFO';

export function userInfo(info) {
  console.log("yo in actions", info)
  return {
    type: USER_INFO,
    info,
  };
}

