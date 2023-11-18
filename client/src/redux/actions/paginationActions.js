
const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';

const setPage = (page) => ({
    type: SET_PAGE,
    payload: page
  });
  
  const setTotalPages = (totalPages) => ({
    type: SET_TOTAL_PAGES,
    payload: totalPages
  });