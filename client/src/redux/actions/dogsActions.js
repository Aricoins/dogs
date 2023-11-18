import axios from 'axios';


export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const APPLY_FILTERS = 'APPLY_FILTERS';

export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/dogs');
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

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/temps');
      const temperaments = response.data.slice(0, 10); 
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