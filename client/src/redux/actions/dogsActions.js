import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const GET_DOGS = 'GET_DOGS';

export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get('https://dogs-server-s368.onrender.com/dogs');
      const data = response.data;
      const dataWithIds = data.map((dog) => ({
        ...dog,
        id: dog.id !== undefined ? dog.id : uuidv4(),
      }));

      dispatch({
        type: GET_DOGS,
        payload: dataWithIds,
      });
    } catch (error) {
      console.error('Error al obtener los perros', error);

      // Puedes despachar otra acción aquí para manejar el error si es necesario
      // dispatch({
      //   type: 'FETCH_DOGS_FAILURE',
      //   payload: { error: error.message },
      // });
    }
  };
}
