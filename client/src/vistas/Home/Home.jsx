import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions/dogsActions';
import Cards from '../../Components/Cards';
import Nav from '../../Components/Nav';
import SearchBar from '../../Components/SearchBar';
import styled, { keyframes } from 'styled-components';
import imagen from "../Landing/icono.png";
import colores from "../../vistas/colores";
// Pagination actions available but not used in current implementation
// import { setPage, setTotalPages } from '../../redux/actions/paginationActions';
import gif from "../../assets/gif3.gif";

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Contenedor principal
const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow-x: hidden;
`;

// Header mejorado
const Header = styled.header`
  background: linear-gradient(135deg, ${colores.amarillo} 0%, #f9ca24 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  animation: ${slideInFromTop} 0.8s ease-out;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

const BrandLogo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

const BrandTitle = styled.h1`
  color: ${colores.verde};
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 5vw, 1.8rem);
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

// Contenido principal
const MainContent = styled.main`
  animation: ${fadeIn} 1s ease-out;
`;

// Loading mejorado
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  gap: 2rem;
`;

const LoadingImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulseAnimation} 2s infinite;
`;

const LoadingImage = styled.img`
  width: clamp(200px, 25vw, 300px);
  height: clamp(200px, 25vw, 300px);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 4px solid ${colores.amarillo};
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top: 4px solid ${colores.verde};
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingText = styled.div`
  text-align: center;
  color: ${colores.verde};
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 600;
  
  .dots {
    animation: ${pulseAnimation} 1.5s infinite;
  }
`;

const LoadingSubtext = styled.p`
  color: #666;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  margin: 0;
  text-align: center;
  max-width: 400px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 300px;
  height: 8px;
  background-color: ${colores.lightGrey};
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${colores.primaryGradient};
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const ProgressText = styled.div`
  font-size: 0.9rem;
  color: ${colores.mediumGrey};
  margin-top: 0.5rem;
  font-weight: 600;
`;

// Contenedor de tarjetas
const CardsContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 1s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Estados de error
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
  text-align: center;
  color: #e74c3c;
`;

const ErrorMessage = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, ${colores.verde} 0%, #27ae60 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Componente principal
const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Iniciando conexión');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Efecto para los puntos del loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        setLoadingProgress(0);
        
        // Simular progreso para mejor UX
        setLoadingMessage('Verificando cache local');
        setLoadingProgress(20);
        
        await new Promise(resolve => setTimeout(resolve, 200)); // Breve pausa para mostrar mensaje
        
        setLoadingMessage('Conectando con el servidor');
        setLoadingProgress(40);
        
        await dispatch(getDogs());
        
        setLoadingMessage('Procesando datos');
        setLoadingProgress(80);
        
        await new Promise(resolve => setTimeout(resolve, 300)); // Pausa para procesar
        
        setLoadingProgress(100);
        setLoadingMessage('¡Listo!');
        
        await new Promise(resolve => setTimeout(resolve, 200)); // Pausa final
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch]);

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    dispatch(getDogs()).catch(() => {
      setError(true);
      setLoading(false);
    });
  };

  const renderContent = () => {
    if (error) {
      return (
        <ErrorContainer>
          <ErrorMessage>¡Oops! Algo salió mal</ErrorMessage>
          <LoadingSubtext>
            No pudimos cargar los adorables perritos. ¿Intentamos de nuevo?
          </LoadingSubtext>
          <RetryButton onClick={handleRetry}>
            Intentar de nuevo
          </RetryButton>
        </ErrorContainer>
      );
    }

    if (loading) {
      return (
        <LoadingContainer>
          <LoadingImageContainer>
            <LoadingImage src={gif} alt="Cargando perritos adorables" />
            <LoadingSpinner />
          </LoadingImageContainer>
          
          <LoadingText>
            {loadingMessage}
            <span className="dots">{loadingDots}</span>
          </LoadingText>
          
          <ProgressContainer>
            <ProgressBar progress={loadingProgress} />
          </ProgressContainer>
          
          <ProgressText>
            {loadingProgress}% completado
          </ProgressText>
          
          <LoadingSubtext>
            {loadingProgress < 40 ? 'Verificando datos locales...' :
             loadingProgress < 80 ? 'Descargando desde el servidor...' :
             loadingProgress < 100 ? 'Preparando la interfaz...' :
             '¡Ya casi listo!'}
          </LoadingSubtext>
        </LoadingContainer>
      );
    }

    return (
      <CardsContainer>
        <Cards dogs={dogs} />
      </CardsContainer>
    );
  };

  return (
    <HomeContainer>
      <Header>
        <HeaderContent>
          <BrandContainer>
            <BrandLogo src={imagen} alt="Dogs App Logo" />
            <BrandTitle>Dogs App</BrandTitle>
          </BrandContainer>
          
          <SearchContainer>
            <SearchBar />
          </SearchContainer>
        </HeaderContent>
      </Header>

      <Nav />
      
      <MainContent>
        {renderContent()}
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
