import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled  from 'styled-components';
import {NavLink} from "react-router-dom"
const CardWrapper = styled.figure`
  width: 200px;
  height: 300px;
  margin: 20px;
  display: flex;
  justify-content: center;
  border: 2px solid #000;
  background-color: red;
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

  img {
    width: 150px;
    height: 200px;
    border-radius: 5px;
  }

  :hover {
    filter: brightness(1.2);
  }
`;

const StyledLink = styled(NavLink)`
  color: #fdfafa;
  text-decoration: none;
  text-align: center;
  transition: 1s;
  background-color: #F10505ff;
  opacity: 1;

  :hover {
    color: black;
    cursor: pointer;
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: #fd0909;
  display: flex;
  color: white;
  height: 80%;
  width: 80%;
  margin: 5%;
  opacity: 1;
  justify-content: center;
  cursor: pointer;

  :hover {
    background-color: #eeabab;
    color: white;
  }
`;

const SubHeading = styled.h6`
  color: white;
  display: flex;
  justify-content: center;
  margin: 1%;
  opacity: 1;
`;

function Card({
  nombre,
  imagen,
  altura,
  peso,
  anios,
 }) {

  return (
    <CardWrapper>
      <CardContent>
        <StyledLink to={`/detail/${nombre}`}>
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
export default Card
