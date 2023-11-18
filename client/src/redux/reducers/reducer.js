import {GET_DOGS} from "../actions/dogsActions";
import {GET_TEMPERAMENTS, APPLY_FILTERS} from "../actions/dogsActions";
import {SET_PAGE} from "../actions/paginationActions";
import {SET_TOTAL_PAGES} from "../actions/paginationActions"; 


const initialState = {
  dogs: [],
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 10,
  totalItems: 0,
  temperaments: [], 
  filteredTemperaments: [],
  filteredDogs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case APPLY_FILTERS:
             return {
        ...state,
        dogs: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

