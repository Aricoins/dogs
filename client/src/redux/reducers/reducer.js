import {GET_DOGS} from "../actions/dogsActions";

const initialState = {
    dogs: [], // Aquí almacenaremos la lista de perros
  //  currentPage: 1,
   // totalDogs: 0
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
                 };
      // case 'SET_CURRENT_PAGE':
      //   return {
      //     ...state,
      //     currentPage: action.payload,
      //   };
      // // Agrega más casos según sea necesario
      default:
        return state;
    }
  };
  
  export default reducer;
  