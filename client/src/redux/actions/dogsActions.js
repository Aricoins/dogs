import axios from 'axios';


export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const APPLY_FILTERS = 'APPLY_FILTERS';

export function getDogs() {
  return async function (dispatch) {
    try {
      // Verificar cache local primero
      const cachedDogs = localStorage.getItem('dogs-cache');
      const cacheTimestamp = localStorage.getItem('dogs-cache-timestamp');
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
      
      const now = Date.now();
      if (cachedDogs && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
        console.log('Usando datos del cache');
        dispatch({
          type: GET_DOGS,
          payload: JSON.parse(cachedDogs),
        });
        return;
      }

      console.log('Obteniendo datos del servidor...');
      const response = await axios.get('https://server-dogs-lr41.onrender.com/dogs');

      const data = response.data;
      
      // Guardar en cache
      localStorage.setItem('dogs-cache', JSON.stringify(data));
      localStorage.setItem('dogs-cache-timestamp', now.toString());
      
      dispatch({
        type: GET_DOGS,
        payload: data,
      });
      console.log('Datos obtenidos y guardados en cache:', data.length, 'perros');
    } catch (error) {
      console.error('Error al obtener los dogs', error);
      
      // Intentar usar cache como fallback
      const cachedDogs = localStorage.getItem('dogs-cache');
      if (cachedDogs) {
        console.log('Usando cache como fallback');
        dispatch({
          type: GET_DOGS,
          payload: JSON.parse(cachedDogs),
        });
      } else {
        dispatch({
          type: GET_DOGS,
          payload: [],
        });
      }
    }
  };
}

 //  'https://server-dogs-lr41.onrender.com/temps');

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      // Verificar cache local primero
      const cachedTemperaments = localStorage.getItem('temperaments-cache');
      const cacheTimestamp = localStorage.getItem('temperaments-cache-timestamp');
      const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos (los temperamentos cambian menos)
      
      const now = Date.now();
      if (cachedTemperaments && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
        console.log('Usando temperamentos del cache');
        dispatch({ 
          type: GET_TEMPERAMENTS, 
          payload: JSON.parse(cachedTemperaments) 
        });
        return;
      }

      console.log('Obteniendo temperamentos del servidor...');
      const response = await axios.get('https://server-dogs-lr41.onrender.com/temps');
   
      const temperaments = response.data;
      
      // Guardar en cache
      localStorage.setItem('temperaments-cache', JSON.stringify(temperaments));
      localStorage.setItem('temperaments-cache-timestamp', now.toString());
      
      dispatch({ 
        type: GET_TEMPERAMENTS, 
        payload: temperaments 
      });
      console.log('Temperamentos obtenidos y guardados en cache:', temperaments.length);
    } catch (error) {
      console.error('Error al obtener temperamentos:', error);
      
      // Intentar usar cache como fallback
      const cachedTemperaments = localStorage.getItem('temperaments-cache');
      if (cachedTemperaments) {
        console.log('Usando temperamentos del cache como fallback');
        dispatch({ 
          type: GET_TEMPERAMENTS, 
          payload: JSON.parse(cachedTemperaments) 
        });
      } else {
        dispatch({ 
          type: GET_TEMPERAMENTS, 
          payload: [] 
        });
      }
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