import React from 'react';
import Card from './Card';
import styled from 'styled-components';

const Background = styled.div`
  background-image: url("../src/assets/backgroundd.jpg");
  background-size: cover;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  max-width: 50vh;
  margin: 2px auto;
  padding: 5%;
  height: auto;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function Cards(props) {
  const { dogs } = props;

  const cardList = dogs.map((dog) => (
    <Card key= {dog.id} dog={dog} />
  ));
  return (
    <>
      <Background>
        <CardContainer className='lista'>
          {cardList}
        </CardContainer>
      </Background>
    </>
  );
}
