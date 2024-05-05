import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import Paginado from './Paginado';
import Filtros from './Filtros';
import colores from '../vistas/colores';

const Background = styled.div`
// background-image: url("https://i.pinimg.com/originals/6c/6d/6a/6c6d6a4b0b0b0b0b0b0b0b0b0b0b0b0b.jpg");
`;

const Footer = styled.footer`
  background-color: ${colores.amarillo};
  height: 100px;
`;

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

const Cards = ({ paginatedDogs, totalPages, currentPage, onPageChange }) => {
  // Mapea los perros de la página actual a cada Card
  const cardList = paginatedDogs.map((dog) => <Card key={dog.id} dog={dog} />);

  return (
    <>
      <Filtros />
      <Background>
        <CardContainer className='lista'>
          {cardList}
        </CardContainer>
        <Paginado
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <Footer />
      </Background>
    </>
  );
};

export default Cards;
