import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const GET_DOGS = 'GET_DOGS';

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

      // Puedes despachar otra acción aquí para manejar el error si es necesario
      // dispatch({
      //   type: 'FETCH_DOGS_FAILURE',
      //   payload: { error: error.message },
      // });
    }
  };
}
