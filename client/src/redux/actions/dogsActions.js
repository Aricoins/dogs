import axios from 'axios';


// export const setCurrentPage = (page) => ({
//   type: 'SET_CURRENT_PAGE',
//   payload: page,
// });
export const GET_DOGS = "GET_DOGS";


export function getDogs(){
    return  async function (dispatch){
  try {
    const response = await axios.get(`http://localhost:3001/dogs`);
    const data = response.data;
    return dispatch( { 
        type: 'GET_DOGS',
    payload: { data },})

  } catch (error) {
    console.error('No estan viniendo los dogs', error);
  }
} 
}