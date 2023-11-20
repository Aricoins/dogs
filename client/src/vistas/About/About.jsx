import styled from "styled-components"
import imagenn from "../Landing/icono.png"
import { Link } from "react-router-dom";
import colores from "../colores";
import Nav from "../../Components/Nav";

const Contenedor = styled.div`
background-color: ${colores.verde};
opacity: 0.9;
width: 80%;
padding: 2%;
border-radius: 3%;
text-align: center;
display: flex;
color: black;
margin: auto;
margin-top:10%;
margin-bottom: 10%;
font-family: 'Roboto', sans-serif;

/* @media only screen and (max-width : 400px) {
border-color:  ${colores.amarillo};
margin-top: 80%;
 border: 20%;
 display: grid;
 grid-template-columns: 80%; 
 grid-template-rows: 80%;
 
} */
`
const Bloque= styled.div`
margin-top: 2%;
background-color:${colores.amarillo};
display: flex;
flex-direction: column ;
justify-content: center;
box-shadow: 0em 0em 2em 0.5em;
border-radius: 1em;
align-self: center;
align-items: center;
align-content: center;
width: 80%;
margin: auto;
@media only screen and (max-width : 600px) {
border-color: ${colores.amarillo};
margin-top: 30%;
 border: 20%;
 display: grid;
 grid-template-columns: 80%; 
 grid-template-rows: 80%;
 
}    `;

  const Imagen= styled.img`
border-radius: 35%;
width: 40%;
height: 40%;
display:flex;
opacity: 1;
margin: 0;
`
const Estilo = styled.span`
  background-color: ${colores.marron};
  opacity: 0.8;
  width: 86%;
  color: ${colores.azul}; 
  text-align: justify;
  margin-top: 3%;
  padding: 5%;
  `
const H2= styled.h2`
 
color:  ${colores.marron}; 
font-size: 40px;
margin:0;
&:hover{
color:  ${colores.verde}; ; 

}
`

const Tecnologias = styled.div`
      flex-direction: column; 
    background-color: rgb(4, 79, 72, .8);
    width: 800px;
    height: 90%;
  opacity: 0.9;
  text-align: center;
  color: ${colores.amarillo};
  padding: 2%;
  /*font-size: 80%;
  padding: 2%;
  align-items: center;*/
  margin-bottom: 20%;
    display: flex;
  justify-content:center;
align-content: center;
margin-top: 5%;
`

function About (){

    return(<>
<Contenedor>
<Bloque>
     <H2> About Dogs App</H2>   
     <Imagen src={imagenn} alt="logo"/>
       <Estilo >   
       Desarrollé esta <i>single page application </i> como proyecto individual en mi aprendizaje de Full Stack Developer. 
       Acá se integran los principales lenguajes y tecnologías que me permiten programar bases de datos relacionales,
       servidores web, sitios y aplicaciones de vanguardia. <br/>
       </Estilo>
       <p style={{justifyContent: "right", textDecoration: "none", 
       cursor: "pointer" }}> <Link to="https://aegres.netlify.app/"> Ariel G Rogel <br/>
       Full Stack Developer</Link></p> 
       <Tecnologias>
          <h3>   Con Javascript, CSS, HTML, React, Router, Redux, 
         <br/> Express, Postgress, Sequelize & MySQL</h3>
        <div style={{ backgroundColor: colores.amarillo, padding: "2%", display:"flex", justifyContent: "space-between"}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Logo de JavaScript" width="50px" />
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="Logo de CSS" width="50px" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" alt="Logo de HTML5" width="50px" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo de React" width="50px" />
      <img src="https://seeklogo.com/images/R/react-router-logo-AB5BFB638F-seeklogo.com.png" alt="Logo de React Router" width="50px" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" alt="Logo de Redux" backgroundColor="white" width="50px" />
           <img src="https://miro.medium.com/v2/resize:fit:1400/1*5ZLTnnDA1pHRtwXvxq_LAg.png" alt="Logo de Redux" width="50px" />
                <img src="data:image/png;base64,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" alt="Logo de Redux" width="50px" />
 <img 
 src=" data:image/png;base64,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" alt="Logo de Redux" width="50px" />
                                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXL2L5LWSonB-AZD4D_5GxZBbew3jbUoZ9yVN8fFBttOXljVlGA3SnGm5pVY2s9DK4tv0&usqp=CAU" alt="Logo de Redux" width="50px" /> </div>
    </Tecnologias>
    </Bloque>
    
 
    </Contenedor>
    <Nav/>
    </>
    )
}

export default About