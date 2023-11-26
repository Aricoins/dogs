import axios from 'axios';


export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const APPLY_FILTERS = 'APPLY_FILTERS';

export function getDogs() {
  return async function (dispatch) {
    try {
//      const response = await axios.get('https://server-dogs-lr41.onrender.com/dogs');
const response = await axios.get('https://server-dogs-lr41.onrender.com/dogs');

      const data = response.data;
          dispatch({
        type: GET_DOGS,
        payload: data,
      });
      console.log(data)
    } catch (error) {
      console.error('Error al obtener los dogs', error);

    }
  };
}

 //  'https://server-dogs-lr41.onrender.com/temps');

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://server-dogs-lr41.onrender.com/temps');
   
      const temperaments = response.data; 
      dispatch({ type: GET_TEMPERAMENTS, 
        payload: temperaments });
    } catch (error) {
      console.error(error);
    }
  };
};

export const applyFilters = (dogsfilter) => {
return (dispatch) => {
      dispatch({
        type: APPLY_FILTERS,
        payload: dogsfilter,
       })
  };
}