import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colores from '../vistas/colores';

const CardWrapper = styled.figure`
  width: 200px;
  height: 400px;
  margin: 20px;
  display: flex;
  justify-content: center;
  border: 2px solid ${colores.verde};
  background-color: ${colores.amarillo};
  border-radius: 10px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5em;
  opacity: 1;
`;

const ImageContainer = styled.h2`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 1s;
  opacity: 1;
  color: ${colores.marron}

  img {
    width: 150px;
    height: 200px;
    border-radius: 10px;
  }

  :hover {
    filter: brightness(1.2);
  }
`;

const StyledLink = styled(NavLink)`
  color: ${colores.blanco};
  text-decoration: none;
  text-align: center;
  transition: 1s;
  opacity: 1;
  border-radius: 10px;
  font-size: 20px;

  :hover {
    color: ${colores.negro};
    cursor: pointer;
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: ${colores.rojo};
  display: flex;
  color: ${colores.blanco};
  height: 80%;
  width: 80%;
  margin: 5%;
  opacity: 1;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;

  :hover {
    background-color: ${colores.melon};
    color: ${colores.blanco};
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
  } = dog;

  return (
    <CardWrapper>
      <CardContent>
        <StyledLink to={`/detail/${id}`} props={dog}>
          {nombre}
          <ImageContainer>
            <img src={imagen} alt={`Dog ${nombre}`} />
          </ImageContainer>
          <SubHeading>Altura: {altura} cm</SubHeading>
          <SubHeading>Peso: {peso} kg</SubHeading>
          <SubHeading>Años: {anios}</SubHeading>
        </StyledLink>
      </CardContent>
    </CardWrapper>
  );
}

export default Card;
