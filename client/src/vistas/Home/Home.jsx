import React, { useEffect, useReducer } from 'react';
import { connect , useDispatch, useSelector} from 'react-redux';
import { fetchDogs } from '../../redux/actions/dogsActions';
import styled from 'styled-components';
import reducer from '../../redux/reducers/reducer';
import { getDogs } from '../../redux/actions/dogsActions';
import Card from '../../Components/Card';

const HomeContainer = styled.div`
  padding: 20px;
`;

const DogList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const DogItem = styled.li`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  p {
    margin: 10px 0;
    font-weight: bold;
  }
`;

const initialState = {
  loading: true,
  dogs: [],
  currentPage: 1,
  totalDogs: 0,
  error: null,
};


const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector ((state) => state.dogs);

    useEffect(() => {
          dispatch( getDogs())
        //  return (()=> clearDetail())
        }, [dispatch])

        //   try {
        //   const response = await fetchDogs();
        //   if (!response) {
        //     throw new Error('Empty response');
        //   }

        //   if (!response.ok) {
        //     throw new Error(`Server error: ${response.statusText}`);
        //   }

        //   const data = await response.json();
        //   if (!data) {
        //     throw new Error('Invalid JSON format');
        //   }

          // Verificamos que la respuesta tenga la estructura esperada
//           if (!data.dogs || !data.currentPage || !data.totalDogs) {
//             throw new Error('Invalid response format');
//           }

//           dispatch({
//             type: 'GET_DOGS',
//             payload: {
//               dogs: data.dogs,
//               currentPage: data.currentPage,
//               totalDogs: data.totalDogs,
//             },
//           });
//         } catch (error) {
//           dispatch({ type: 'FETCH_DOGS_FAILURE', payload: { error: error.message } });
//         }
//       };

//       fetchData();
//     }, [fetchDogs]);




//   const { loading,  currentPage, totalDogs, error } = state;

//   if (loading) {
//     return <div>Cargando perros...</div>;
//   }

//   if (error) {
//     return <div>Error al obtener perros: {error.message}</div>;
//   }

//   const perrosPorPagina = 8;
//   const primerIndice = (currentPage - 1) * perrosPorPagina;
//   const ultimoIndice = primerIndice + perrosPorPagina;
//   const perrosEnPagina = dogs.slice(primerIndice, ultimoIndice);

  return (
 <>
      <h1>Home</h1>
   
      <Card dogs={dogs}/>


      {/* <div>
        Página {currentPage} de {Math.ceil(totalDogs / perrosPorPagina)}
      </div> */}
</>
  );
};

export default Home;
