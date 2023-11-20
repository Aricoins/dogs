import React, { useState, useEffect } from 'react';
import Card from './Card';
import styled from 'styled-components';
import Paginado from './Paginado';
import Filtros from './Filtros';
import colores from '../vistas/colores'

const Background = styled.div`
//background-image: url("https://i.pinimg.com/originals/6c/6d/6a/6c6d6a4b0b0b0b0b0b0b0b0b0b0b0b0b.jpg");
`;

const Footer = styled.footer`
  background-color: ${colores.amarillo};
  height: 100px;
`
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 40vh;
  margin: auto;
  margin-top: 1%;
  padding: 5%;
  height: auto;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Cards = ({ dogs }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 8;

  // Calculate the start and end indexes for the paginated dogs
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedDogs = dogs.slice(startIndex, endIndex);

  // Create a list of Card components for the paginated dogs
  const cardList = paginatedDogs.map((dog) => (
    <Card key={dog.id} dog={dog} />
  ));

  // Calculate the total number of pages
  const totalPaginas = Math.ceil(dogs.length / perPage);

  // Handle page change
  const handlePaginaChange = (newPaginatedDogs) => {
    setCurrentPage(newPaginatedDogs);
  };

  return (
    <>
    <Filtros />
      <Background>
        <CardContainer className='lista'>
          {cardList}
        </CardContainer>
        <Paginado
          totalPages={totalPaginas}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          handlePaginaChange={handlePaginaChange}
        />
        <Footer/>
      </Background>
    </>
  );
};

export default Cards;