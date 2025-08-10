
export const SET_PAGE = 'SET_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page
  });
  
export const setTotalPages = (totalPages) => ({
    type: SET_TOTAL_PAGES,
    payload: totalPages
  });