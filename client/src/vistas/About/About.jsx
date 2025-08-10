import { 
  SiJavascript, 
  SiCss3, 
  SiHtml5, 
  SiReact, 
  SiRedux, 
  SiExpress, 
  SiPostgresql, 
  SiSequelize,
  SiMysql,
  SiNodedotjs
} from "react-icons/si";
import { FaRoute } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import imagenn from "../Landing/icono.png";
import colores from "../colores";
import Nav from "../../Components/Nav";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(4, 79, 72, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(4, 79, 72, 0); }
  100% { box-shadow: 0 0 0 0 rgba(4, 79, 72, 0); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px ${colores.amarillo}; }
  50% { text-shadow: 0 0 20px ${colores.amarillo}, 0 0 30px ${colores.amarillo}; }
  100% { text-shadow: 0 0 5px ${colores.amarillo}; }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Componentes estilizados
const GlassContainer = styled.div`
  background: rgba(4, 79, 72, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  width: 85%;
  max-width: 1200px;
  margin: 8% auto;
  padding: 3%;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${colores.verde}, ${colores.amarillo}, ${colores.azul}, ${colores.marron});
    background-size: 400% 400%;
    animation: ${gradient} 15s ease infinite;
    z-index: -1;
    border-radius: 22px;
  }
  
  @media (max-width: 900px) {
    width: 90%;
    margin: 15% auto;
  }
  
  @media (max-width: 600px) {
    width: 95%;
    margin: 20% auto 10%;
    padding: 5%;
  }
`;

const ContentBlock = styled.div`
  background: rgba(4, 79, 72, 0.7);
  border-radius: 15px;
  padding: 3rem;
  margin: 0 auto;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colores.amarillo}, ${colores.verde});
  }
  
  @media (max-width: 900px) {
    padding: 2rem;
  }
  
  @media (max-width: 600px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

const FloatingImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 0 auto 2rem;
  display: block;
  object-fit: cover;
  border: 3px solid ${colores.amarillo};
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.5);
  animation: ${float} 4s ease-in-out infinite;
  
  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`;

const GlowTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.8rem;
  text-align: center;
  color: ${colores.amarillo};
  margin: 0 0 2rem;
  letter-spacing: 1.5px;
  animation: ${glow} 3s ease-in-out infinite;
  position: relative;
  
  &:after {
    content: "";
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, ${colores.amarillo}, transparent);
    margin: 10px auto 0;
  }
  
  @media (max-width: 900px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const GlassText = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  color: white;
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    pointer-events: none;
  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const Signature = styled.p`
  text-align: right;
  font-style: italic;
  margin: 1rem 0 2rem;
  color: ${colores.amarillo};
  font-size: 1.1rem;
  
  a {
    color: white;
    text-decoration: none;
    border-bottom: 1px dashed ${colores.amarillo};
    transition: all 0.3s ease;
    padding-bottom: 2px;
    
    &:hover {
      color: ${colores.amarillo};
      border-bottom: 1px solid ${colores.amarillo};
    }
  }
`;

const TechContainer = styled.div`
  background: linear-gradient(135deg, rgba(4, 79, 72, 0.9), rgba(2, 40, 36, 0.9));
  border-radius: 15px;
  padding: 2rem;
  margin: 3rem auto 0;
  width: 100%;
  text-align: center;
  color: ${colores.amarillo};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${colores.amarillo}, ${colores.verde}, ${colores.amarillo});
  }
  
  h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    margin: 0 0 1.5rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 900px) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    
    h3 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
  }
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  animation: ${pulse} 4s infinite;
  
  @media (max-width: 600px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const TechIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    svg {
      color: ${colores.amarillo};
      filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
    }
  }
  
  svg {
    width: 50px;
    height: 50px;
    color: white;
    transition: all 0.3s ease;
    
    @media (max-width: 600px) {
      width: 40px;
      height: 40px;
    }
  }
  
  span {
    margin-top: 8px;
    font-size: 0.8rem;
    color: white;
    text-align: center;
    opacity: 0.8;
    
    @media (max-width: 600px) {
      font-size: 0.7rem;
    }
  }
`;


function About() {
  const techStack = [
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "CSS3", icon: <SiCss3 /> },
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "React", icon: <SiReact /> },
    { name: "React Router", icon: <FaRoute /> },
    { name: "Redux", icon: <SiRedux /> },
    { name: "Express", icon: <SiExpress /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "Sequelize", icon: <SiSequelize /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
  ];

  return (
    <>
      <GlassContainer>
        <ContentBlock>
          <GlowTitle>About Dogs App</GlowTitle>
          <FloatingImage src={imagenn} alt="logo" />
          <GlassText>
            Desarrollé esta <i>single page application</i> como proyecto individual en mi aprendizaje de Full Stack Developer.
            Acá se integran los principales lenguajes y tecnologías que me permiten programar bases de datos relacionales,
            servidores web, sitios y aplicaciones de vanguardia.
          </GlassText>
          <Signature>
            <a href="https://portfolio-dmao.vercel.app/" target="_blank" rel="noopener noreferrer">
              Ariel G Rogel <br />
              Full Stack Developer
            </a>
          </Signature>
          <TechContainer>
            <h3>Con JavaScript, CSS, HTML, React, Router, Redux, Express, Postgres, Sequelize & MySQL</h3>
            <TechGrid>
              {techStack.map((tech, index) => (
                <TechIcon key={index}>
                  {tech.icon} {/* Esto ahora es un elemento JSX válido */}
                  <span>{tech.name}</span>
                </TechIcon>
              ))}
            </TechGrid>
          </TechContainer>
        </ContentBlock>
      </GlassContainer>
      <Nav />
    </>
  );
}

export default About;