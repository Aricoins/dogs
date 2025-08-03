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
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [loading, setLoading] = useState(true);
// url = "http://server-dogs-lr41.onrender.com/dogs/"
  useEffect(() => {
    axios.get(`https://server-dogs-lr41.onrender.com/dogs/${id}`)
      .then(({ data }) => {
        if (data) {
          setDog(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        window.alert("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Onda>
        {loading ? (
          <p>Se escuchan ladridos, las mascotas están llegando... </p>
        ) : (
          <>
            <Detalle>Nombre: {dog.nombre}</Detalle>
            <Img src={dog.imagen} alt={dog.nombre} />
            <Propiedades>Altura: {dog.altura}</Propiedades>
            <Propiedades>Peso: {dog.peso}</Propiedades>
            <Propiedades>Temperamento: {dog.temperament}</Propiedades>
            <Propiedades>Pronóstico de Vida: {dog.anios}</Propiedades>
          </>
        )}
      </Onda>

      <Nav />
    </>
  );
}

export default Detail;
