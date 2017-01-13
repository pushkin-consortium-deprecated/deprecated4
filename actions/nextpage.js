export const NEXT_PAGE = 'NEXT_PAGE';

export function nextPage(pageInfo) {
  return {
    type: NEXT_PAGE,
    pageInfo,
  };
}

