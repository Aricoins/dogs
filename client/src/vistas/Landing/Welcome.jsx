import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import video from '../../assets/fondo.mp4'
import audio from '../../assets/sonido.mp3';
import Login from './Login';

/*
  background-color: #b2d8d8; /* Azul Claro */
//   color: #3d7d52; /* Verde Pastel */
//   color: rgb(139, 69, 19); /* Marrón */
//   color: #ffd700; /* Amarillo */
//   background-color: #d3d3d3; /* Gris Claro */
// */
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  95% {
    opacity: 50%;
  }
  100% {
    opacity: 1;
  }
`;

const Sound = styled.audio`
  position: fixed;
  top: 89%;
  left: 12%;
  width: 20%;
  opacity: 0.2;
  transform: translate(0, -50%);
  text-align: left;
  font-size: 3rem;
  font-weight: bold;
`;

const WelcomeWrapper = styled.div`
 position: fixed;
left: 0;
top: 0;
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
z-index:0;
  @media only screen and (max-width: 700px) {
    /* Cambia la altura para dispositivos más pequeños */
    height: 35vh;
  }
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Styles = styled.div` 

  color: #ffd700;
  font-weight: bold;
  font-size: 3rem;
  -webkit-text-stroke: 5% #b2d8d8 ;
  border-color:#b2d8d8;

`
const TextOverlay = styled.div`
  position: fixed;
  top: 35%;
  left: 5%;
  text-align: left;
  color:  #d3d3d3;
  font-size: 2rem;
  font-weight: bold;
  -webkit-text-stroke:#0d0b01 0.5px ;
  @media only screen and (max-width: 700px) {
    /* Cambia la altura para dispositivos más pequeños */
    top: 10%;
    font-size: medium;
  }

  h3 {
    margin: 0;
  }

  .fadeIn {
    animation: ${fadeInAnimation} 0.3s backwards infinite;
  }
`;

const Welcome = () => {
  const appPhrases = [
    "lealtad","suavidad", "amistad", "inteligencia", "compañia"
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    // Establecemos un intervalo que se ejecutará cada 2000 milisegundos (2 segundos)
    const intervalId = setInterval(() => {
      // Actualizamos el índice de la frase utilizando la función de setPhraseIndex
      setPhraseIndex((prevIndex) => {
        // Verificamos si el índice actual es el último de la lista de frases
        if (prevIndex === appPhrases.length - 1) {
          // Si es el último, reiniciamos al primer índice
          return 0;
        } else {
          // Si no es el último, avanzamos al siguiente índice
          return prevIndex + 1;
        }
      });
    }, 1000);
  
    // Limpiamos el intervalo cuando el componente se desmonta o cuando el efecto se ejecuta nuevamente
    return () => {
      clearInterval(intervalId);
    };
  }, [appPhrases.length]); // El array vacío [] asegura que el efecto solo se ejecute al montar y desmontar el componente
  
  return (<>
    <Login />
    <WelcomeWrapper>
   
      <VideoBackground src={ video} autoPlay loop muted />
      <TextOverlay>
        <h3>
         Descubrí la <Styles>{appPhrases[phraseIndex]}</Styles> de tu nueva
         <br/> mascota
          <span className="fadeIn"></span>
        </h3>
      </TextOverlay>
      <Sound controls  >
        <source type="audio/mpeg" src={audio} />  </Sound>
     
    </WelcomeWrapper>
    </>
  );
};

export default Welcome;
