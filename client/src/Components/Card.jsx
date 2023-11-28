import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colores from '../vistas/colores';

const CardWrapper = styled.figure`
  width: 200px;
  height: 400px;
  margin: 10px;
  display: flex;
  justify-content: center;
  border: 5px solid ${colores.verde};
  background-color: ${colores.amarillo};
  border-radius: 10px;
  box-shadow: 0em 1em 2em 0.5em black;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5em;
  opacity: 1;
`;

const ImageContainer = styled.h2`
  width: 200px;
  max-height: 200px;
   display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 1s;
  opacity: 1;
  color: ${colores.marron}

  img {
    width: 150px;
    height: 100px;
    border-radius: 10px;
  }

  :hover {
    filter: brightness(1.2);
  }
`;

const StyledLink = styled(NavLink)`
  
color: ${colores.marron};
font-weight: bold;
text-decoration: none;
  text-align: center;
  transition: 1s;
  opacity: 1;
  border-radius: 10px;
  font-size: 15px;

  :hover {
    color: ${colores.negro};
    cursor: pointer;
    opacity: 0.9;
  }
`;


const SubHeading = styled.h6`
  color: ${colores.verde};
  display: flex;
  justify-content: center;
  margin: 1%;
  opacity: 1;
`;

function Card({
  dog
}) {
  const {
        id,
    nombre,
    imagen,
    altura,
    peso,
    anios,
    temperament

  } = dog;
console.log(dog)
  return (
    <CardWrapper>
      <CardContent>
        <StyledLink to={`/detail/${id}`} props={dog}>
          {nombre}
          <ImageContainer>
            <img src={imagen} alt={`Dog ${nombre}`} />
          </ImageContainer>
          <SubHeading>Altura: {altura}</SubHeading>
          <SubHeading>Peso: {peso} </SubHeading>
          <SubHeading>Años: {anios}</SubHeading>
          <SubHeading>Temperamentos: {temperament}</SubHeading>
        </StyledLink>
      </CardContent>
    </CardWrapper>
  );
}

export default Card;
