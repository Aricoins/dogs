import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import colores from "../colores";
import Nav from "../../Components/Nav";

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
const Img = styled.img`
background-color: ${colores.amarillo};
width: 100%;
max-height: 300px;
object-fit: cover;
border-radius: 10px;
margin: 10px 0;
`

const AdoptionSection = styled.div`
  background-color: ${colores.verde};
  color: ${colores.amarillo};
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  border: 2px solid ${colores.marron};
`;

const AdoptionTitle = styled.h2`
  color: ${colores.amarillo};
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
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
  background-color: ${colores.marron};
  color: ${colores.amarillo};
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${colores.verde};
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: ${colores.verde};
`;

const InfoValue = styled.span`
  color: ${colores.amarillo};
  margin-left: 5px;
`;

const RecommendationBox = styled.div`
  background-color: ${colores.azul};
  color: white;
  padding: 15px;
  margin: 15px 0;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
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
            <Img src={dog.imagen} alt={dog.nombre} />
            
            {/* Información básica */}
            <InfoGrid>
              <InfoCard>
                <InfoLabel>Altura:</InfoLabel>
                <InfoValue>{dog.altura}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>Peso:</InfoLabel>
                <InfoValue>{dog.peso}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>Esperanza de vida:</InfoLabel>
                <InfoValue>{dog.anios}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>Temperamento:</InfoLabel>
                <InfoValue>{dog.temperament}</InfoValue>
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
                {dog.nombre} es ideal para familias que buscan una mascota con nivel de actividad {getActivityLevel(dog.temperament, dog.altura, dog.peso).toLowerCase()} 
                {getExperienceLevel(dog.temperament) === "Principiante" 
                  ? " y es perfecto para dueños primerizos." 
                  : ` y requiere dueños con experiencia ${getExperienceLevel(dog.temperament).toLowerCase()}.`
                }
                {getGoodWithKids(dog.temperament) === "Excelente con niños" && " ¡Será un compañero maravilloso para los niños de la familia!"}
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
