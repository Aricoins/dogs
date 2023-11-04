import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import colores from "../colores";
import Nav from "../../Components/Nav";


const Onda = styled.div`
  position: absolute;
  top: 2%;
  background-color: ${colores.amarillo};
  color: ${colores.marron};
  width: 70%;
  height: 500%; /* Aumenta la altura */
  padding: 5%;
  margin-left:10%;
  box-shadow: 0em 1em 2em 0.5em black;
  border-radius: 1em 1em 1em 1em;
  opacity: 0.9;
  text-align: center;
  font-size: xx-large;
  font-weight: 800;


  @media only screen and (max-width: 600px) {
    border-color: ${colores.azul};
    margin-top: 30%;
    border: 20%;
    display: grid;
    grid-template-columns: 80%;
    grid-template-rows: 80%;
  }
`;

const Propiedades = styled.h3`
  justify-content: center;
  color: ${colores.verde};
  height: 5%;
  background-color: ${colores.amarillo};
`;
const Detalle = styled.div`
  background-color: ${colores.verde};
  color: ${colores.gris};
  height: 5%;
  font-size: 140%

`;
const Img = styled.img`
background-color: ${colores.amarillo};
width: 100%;
`
function Detail(props) {

const {id} = useParams()
const [dog, setDog] = useState()


  useEffect(() => {
    axios.get(`http://localhost:3001/dogs/${id}`).then(({ data }) => {
      if (data) {
        setDog(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
  }, [id]);


  return (
    <>
      {dog && (
        <Onda>
          <Detalle>Nombre: {dog[0].nombre}</Detalle>
          <Img src={dog[0].imagen} alt={dog[0].nombre} /> 
          <Propiedades>Altura:</Propiedades>
          {dog[0].altura}
          <Propiedades>Peso:</Propiedades>
          {dog[0].peso}
          <Propiedades>Temperamento:</Propiedades>
          {dog[0].temperament}
          <Propiedades> Pronóstico de Vida :</Propiedades>
                {dog[0].anios}        
          </Onda>
         ) } 
            <Nav />
    </>
  );
}

export default Detail;