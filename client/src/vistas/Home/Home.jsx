import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions/dogsActions';
import Cards from '../../Components/Cards';
import Nav from '../../Components/Nav';
import SearchBar from '../../Components/SearchBar';
import styled from 'styled-components';
import imagen from "../Landing/icono.png";
import colores from "../../vistas/colores"

const H2 = styled.h2`
display:flex;
flex-direction: row;
justify-content: center;
color: ${colores.verde};
font-size:40px;
padding: 0%;
width: 40%;
margin-left:0%
`
const Barra = styled.div`
display: flex ;
flex-direction: row;
background-color: ${colores.amarillo};
height: 8rem;

`

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
 // const filteredData = dogs.filter((dog) => dog.id !== undefined);
  return (
    <>
    <Barra>
         <H2><img style={{width:"30%", height:"140%"}}src={imagen} alt="hueso"/> Dogs App</H2>
              
    <SearchBar/>
    </Barra>
    <Nav/>
    
      <Cards dogs={dogs} />
    </>
  );
};

export default Home;
