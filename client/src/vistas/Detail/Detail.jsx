import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import colores from "../colores";
import Nav from "../../Components/Nav";
import { translateTemperaments } from "../../utils/temperamentTranslations";

// Funciones para interpretar datos y generar recomendaciones de adopción
const getActivityLevel = (temperament, height, weight) => {
  if (!temperament) return "Moderado";
  
  const highEnergyWords = ["energetic", "active", "playful", "lively", "athletic"];
  const lowEnergyWords = ["calm", "gentle", "quiet", "docile", "lazy"];
  
  const temp = temperament.toLowerCase();
  const hasHighEnergy = highEnergyWords.some(word => temp.includes(word));
  const hasLowEnergy = lowEnergyWords.some(word => temp.includes(word));
  
  const heightNum = parseFloat(height);
  const weightNum = parseFloat(weight);
  
  if (hasHighEnergy || (heightNum > 60 && weightNum > 30)) return "Alto";
  if (hasLowEnergy || (heightNum < 30 && weightNum < 10)) return "Bajo";
  return "Moderado";
};

const getIdealHome = (temperament, height, weight) => {
  const heightNum = parseFloat(height);
  const weightNum = parseFloat(weight);
  
  if (heightNum > 65 || weightNum > 40) {
    return "Casa con jardín grande";
  } else if (heightNum > 40 || weightNum > 20) {
    return "Casa con jardín o apartamento grande";
  } else {
    return "Apartamento o casa";
  }
};

const getExperienceLevel = (temperament) => {
  if (!temperament) return "Principiante";
  
  const advancedWords = ["stubborn", "independent", "dominant", "aggressive", "territorial"];
  const easyWords = ["gentle", "friendly", "easy", "trainable", "obedient"];
  
  const temp = temperament.toLowerCase();
  const needsExperience = advancedWords.some(word => temp.includes(word));
  const isEasy = easyWords.some(word => temp.includes(word));
  
  if (needsExperience) return "Avanzado";
  if (isEasy) return "Principiante";
  return "Intermedio";
};

const getGoodWithKids = (temperament) => {
  if (!temperament) return "Desconocido";
  
  const kidFriendlyWords = ["gentle", "patient", "friendly", "playful", "loyal", "protective"];
  const notKidFriendlyWords = ["aggressive", "snappy", "aloof", "independent"];
  
  const temp = temperament.toLowerCase();
  const isKidFriendly = kidFriendlyWords.some(word => temp.includes(word));
  const notKidFriendly = notKidFriendlyWords.some(word => temp.includes(word));
  
  if (isKidFriendly && !notKidFriendly) return "Excelente con niños";
  if (notKidFriendly) return "Mejor sin niños pequeños";
  return "Supervisión recomendada";
};

const getCareLevel = (temperament, height) => {
  const heightNum = parseFloat(height);
  
  if (!temperament) return "Cuidado estándar";
  
  const temp = temperament.toLowerCase();
  const needsGrooming = heightNum > 50 || temp.includes("fluffy") || temp.includes("long");
  const needsExercise = temp.includes("energetic") || temp.includes("active");
  
  if (needsGrooming && needsExercise) return "Cuidado intensivo";
  if (needsGrooming || needsExercise) return "Cuidado moderado"; 
  return "Cuidado básico";
};



const Onda = styled.div`
  position: absolute;
  top: 2%;
  background-color: ${colores.amarillo};
  color: ${colores.marron};
  width: 70%;
  min-height: 800px; /* Altura mínima ajustable */
  height: auto; /* Altura automática para contenido */
  padding: 5%;
  margin-left: 10%;
  margin-bottom: 10%;
  box-shadow: 0em 1em 2em 0.5em black;
  border-radius: 1em 1em 1em 1em;
  opacity: 0.9;
  text-align: center;
  font-size: large; /* Reducido para mejor legibilidad */
  font-weight: 600;

  @media only screen and (max-width: 600px) {
    border-color: ${colores.azul};
    margin-top: 30%;
    width: 85%;
    margin-left: 7.5%;
    font-size: medium;
  }
`;

const Propiedades = styled.h3`
  justify-content: center;
  color: ${colores.verde};
  height: 5%;
  background-color: ${colores.amarillo};
`;
const Detalle = styled.div`
  background-color: ${colores.verde};
  color: ${colores.gris};
  height: 5%;
  font-size: 140%

`;
// Contenedor para la imagen optimizada
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 30px 0;
  padding: 10px;
  background: linear-gradient(145deg, #f0f0f0, #e0e0e0);
  border-radius: 20px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Img = styled.img`
  width: 100%;
  height: 450px; /* Altura aumentada para mejor visualización */
  max-width: 650px; /* Ancho máximo optimizado */
  object-fit: contain; /* Mantiene proporciones completas sin recortar */
  object-position: center;
  border-radius: 15px;
  border: 4px solid ${colores.verde};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  background: white; /* Fondo blanco para mejor contraste */
  transition: all 0.4s ease;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
    border-color: ${colores.amarillo};
  }
  
  /* Optimización de renderizado para mejor calidad */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  image-rendering: crisp-edges;
  
  /* Asegurar que la imagen se muestre completa */
  min-height: 300px;
  
  /* Responsive design mejorado */
  @media (max-width: 768px) {
    height: 350px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    height: 280px;
    min-height: 200px;
  }
  
  /* Fallback para imágenes que no cargan */
  &:before {
    content: "🐕";
    font-size: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${colores.amarillo};
    opacity: 0;
  }
  
  &:error:before {
    opacity: 1;
  }
`

const AdoptionSection = styled.div`
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  padding: 20px;
  margin: 15px 0;
  border-radius: 20px;
  border: 3px solid #1a252f;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const AdoptionTitle = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8em;
  font-weight: 700;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #f1c40f, #f39c12);
    border-radius: 2px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px 0;
  
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: linear-gradient(145deg, #2c3e50, #34495e);
  color: #ecf0f1;
  padding: 15px;
  border-radius: 15px;
  border: 2px solid #3498db;
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #3498db, #2980b9);
    border-radius: 0 2px 2px 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
    border-color: #5dade2;
  }
`;

const InfoLabel = styled.span`
  font-weight: 700;
  color: #3498db;
  font-size: 0.95em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 5px;
`;

const InfoValue = styled.span`
  color: #ecf0f1;
  font-size: 1.1em;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const RecommendationBox = styled.div`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 25px;
  margin: 20px 0;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
  border: 3px solid #fff;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '💖';
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 6em;
    opacity: 0.1;
    transform: rotate(15deg);
  }
  
  h3 {
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
    font-size: 1.4em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  p {
    position: relative;
    z-index: 1;
    line-height: 1.6;
    font-size: 1.05em;
  }
`;

function Detail(props) {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [loading, setLoading] = useState(true);
// url = "http://server-dogs-lr41.onrender.com/dogs/"
  useEffect(() => {
    axios.get(`https://server-dogs-lr41.onrender.com/dogs/${id}`)
      .then(({ data }) => {
        if (data) {
          setDog(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        window.alert("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Onda>
        {loading ? (
          <p>Se escuchan ladridos, las mascotas están llegando... </p>
        ) : (
          <>
            <Detalle>{dog.nombre}</Detalle>
            <ImageContainer>
              <Img src={dog.imagen} alt={`Foto de ${dog.nombre}`} />
            </ImageContainer>
            
            {/* Información básica */}
            <InfoGrid>
              <InfoCard>
                <InfoLabel>📏 Altura:</InfoLabel>
                <InfoValue>{dog.altura}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>⚖️ Peso:</InfoLabel>
                <InfoValue>{dog.peso}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>⏰ Esperanza de vida:</InfoLabel>
                <InfoValue>{dog.anios}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>🎭 Temperamento:</InfoLabel>
                <InfoValue>{translateTemperaments(dog.temperament)}</InfoValue>
              </InfoCard>
            </InfoGrid>

            {/* Sección de información para adopción */}
            <AdoptionSection>
              <AdoptionTitle>🏠 Información para Adopción</AdoptionTitle>
              
              <InfoGrid>
                <InfoCard>
                  <InfoLabel>⚡ Nivel de Actividad:</InfoLabel>
                  <InfoValue>{getActivityLevel(dog.temperament, dog.altura, dog.peso)}</InfoValue>
                </InfoCard>
                
                <InfoCard>
                  <InfoLabel>🏡 Hogar Ideal:</InfoLabel>
                  <InfoValue>{getIdealHome(dog.temperament, dog.altura, dog.peso)}</InfoValue>
                </InfoCard>
                
                <InfoCard>
                  <InfoLabel>👨‍🏫 Experiencia Requerida:</InfoLabel>
                  <InfoValue>{getExperienceLevel(dog.temperament)}</InfoValue>
                </InfoCard>
                
                <InfoCard>
                  <InfoLabel>👶 Con Niños:</InfoLabel>
                  <InfoValue>{getGoodWithKids(dog.temperament)}</InfoValue>
                </InfoCard>
                
                <InfoCard>
                  <InfoLabel>🛁 Nivel de Cuidado:</InfoLabel>
                  <InfoValue>{getCareLevel(dog.temperament, dog.altura)}</InfoValue>
                </InfoCard>
              </InfoGrid>
            </AdoptionSection>

            {/* Recomendación personalizada */}
            <RecommendationBox>
              <h3>💝 Recomendación Personalizada</h3>
              <p>
                <strong>{dog.nombre}</strong> es ideal para familias que buscan una mascota con nivel de actividad <strong>{getActivityLevel(dog.temperament, dog.altura, dog.peso).toLowerCase()}</strong>
                {getExperienceLevel(dog.temperament) === "Principiante" 
                  ? " y es perfecto para dueños primerizos." 
                  : ` y requiere dueños con experiencia ${getExperienceLevel(dog.temperament).toLowerCase()}.`
                }
                {getGoodWithKids(dog.temperament) === "Excelente con niños" && " ¡Será un compañero maravilloso para los niños de la familia!"}
              </p>
              <p style={{marginTop: '10px', fontSize: '0.9em', fontStyle: 'italic'}}>
                Su temperamento <strong>"{translateTemperaments(dog.temperament)}"</strong> lo hace especialmente adecuado para {getIdealHome(dog.temperament, dog.altura, dog.peso).toLowerCase()}.
              </p>
            </RecommendationBox>
          </>
        )}
      </Onda>

      <Nav />
    </>
  );
}

export default Detail;
