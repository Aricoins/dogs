import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colores from '../vistas/colores';
import { translateTemperaments } from '../utils/temperamentTranslations';

const CardWrapper = styled.figure`
  width: 280px;
  height: 420px;
  margin: 16px;
  display: flex;
  justify-content: center;
  background: ${colores.white};
  border-radius: 16px;
  box-shadow: ${colores.softShadow};
  border: 1px solid ${colores.lightGrey};
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${colores.strongShadow};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
    margin: 12px auto;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 12px;
  background: ${colores.lightGrey};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
    border-radius: 12px;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const DogName = styled.h2`
  color: ${colores.primary};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 12px 0;
  text-transform: capitalize;
  letter-spacing: -0.02em;
`;

const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${colores.lightGrey};
  border-radius: 8px;
  font-size: 13px;
  
  .label {
    font-weight: 600;
    color: ${colores.mediumGrey};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 11px;
  }
  
  .value {
    font-weight: 600;
    color: ${colores.primary};
    text-align: right;
    flex: 1;
    margin-left: 8px;
  }
`;

const TemperamentContainer = styled.div`
  margin-top: 8px;
  
  .label {
    font-weight: 600;
    color: ${colores.mediumGrey};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 11px;
    margin-bottom: 6px;
    display: block;
  }
  
  .temperaments {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
`;

const TemperamentTag = styled.span`
  background: ${colores.primaryGradient};
  color: ${colores.white};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
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

  // Función para mostrar temperamentos como tags
  const getTemperamentTags = (temperamentString) => {
    const translated = translateTemperaments(temperamentString);
    if (!translated) return [];
    
    const temperaments = translated.split(', ');
    return temperaments.slice(0, 3); // Mostrar máximo 3 temperamentos
  };

  const temperamentTags = getTemperamentTags(temperament);

  return (
    <CardWrapper>
      <CardContent>
        <StyledLink to={`/detail/${id}`}>
          <ImageContainer>
            <img 
              src={imagen} 
              alt={`${nombre} - Perro de raza`}
              loading="lazy"
            />
          </ImageContainer>
          
          <DogName>{nombre}</DogName>
          
          <InfoSection>
            <InfoItem>
              <span className="label">Altura</span>
              <span className="value">{altura} cm</span>
            </InfoItem>
            
            <InfoItem>
              <span className="label">Peso</span>
              <span className="value">{peso} kg</span>
            </InfoItem>
            
            <InfoItem>
              <span className="label">Años de vida</span>
              <span className="value">{anios} años</span>
            </InfoItem>
            
            {temperamentTags.length > 0 && (
              <TemperamentContainer>
                <span className="label">Temperamentos</span>
                <div className="temperaments">
                  {temperamentTags.map((temp, index) => (
                    <TemperamentTag key={index}>
                      {temp.trim()}
                    </TemperamentTag>
                  ))}
                </div>
              </TemperamentContainer>
            )}
          </InfoSection>
        </StyledLink>
      </CardContent>
    </CardWrapper>
  );
}

export default Card;
