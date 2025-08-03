import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import video from '../../assets/dog.mp4';
import Login from './Login';

// Animaciones
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const phraseTransition = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
`;

// Contenedor principal
const WelcomeWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  overflow: hidden;
`;

// Video de fondo con overlay
const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
`;

// Overlay oscuro para mejorar legibilidad
const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: -1;
`;

// Contenedor del texto principal
const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  animation: ${slideInFromLeft} 1s ease-out;
`;

// Texto principal
const MainText = styled.h1`
  color: #ffffff;
  font-size: clamp(1.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  animation: ${fadeInAnimation} 1.2s ease-out;
  
  @media (max-width: 768px) {
    text-align: center;
    align-self: center;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 6vw, 2rem);
    line-height: 1.3;
  }
`;

// Palabra destacada animada
const AnimatedWord = styled.span`
  display: inline-block;
  color: #ffd700;
  font-weight: 800;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  animation: ${phraseTransition} 0.6s ease-in-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, transparent);
    border-radius: 2px;
  }
  
  @media (max-width: 480px) {
    display: block;
    margin: 0.5rem 0;
  }
`;

// Subtítulo
const Subtitle = styled.p`
  color: #e0e0e0;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: 400;
  margin: 1rem 0 0 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  opacity: 0.9;
  animation: ${fadeInAnimation} 1.5s ease-out;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

// Indicador de scroll (opcional)
const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-align: center;
  animation: ${fadeInAnimation} 2s ease-out;
  
  &::before {
    content: '↓';
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: 480px) {
    bottom: 1rem;
    font-size: 0.8rem;
  }
`;

// Contenedor responsivo para el layout
const ResponsiveLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    ${ContentContainer} {
      align-items: center;
      text-align: center;
      padding: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    ${ContentContainer} {
      padding: 1rem;
    }
  }
`;

const Welcome = () => {
  const appPhrases = [
    "lealtad", "suavidad", "amistad", "inteligencia", "compañía", 
    "bonhomía", "destreza", "nobleza", "fidelidad", "alegría"
  ];
  
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPhraseIndex((prevIndex) => 
        prevIndex === appPhrases.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Cambiado a 2 segundos para mejor experiencia

    return () => clearInterval(intervalId);
  }, [appPhrases.length]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Error loading video background');
  };

  return (
    <>
      <Login />
      <WelcomeWrapper>
        <ResponsiveLayout>
          <VideoBackground 
            src={video} 
            autoPlay 
            loop 
            muted 
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            style={{ opacity: isVideoLoaded ? 1 : 0 }}
          />
          <VideoOverlay />
          
          <ContentContainer>
            <MainText>
              Descubrí la{' '}
              <AnimatedWord key={phraseIndex}>
                {appPhrases[phraseIndex]}
              </AnimatedWord>
              {' '}de tu nueva mascota
            </MainText>
            
            <Subtitle>
              Conecta con el compañero perfecto que cambiará tu vida
            </Subtitle>
          </ContentContainer>
          
          <ScrollIndicator>
            Desliza para explorar
          </ScrollIndicator>
        </ResponsiveLayout>
      </WelcomeWrapper>
    </>
  );
};

export default Welcome;
