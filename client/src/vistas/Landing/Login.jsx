import React from "react"
import styled from "styled-components";
import {Link} from "react-router-dom"
import icono from './icono.png'

/*
  background-color: #b2d8d8; /* Azul Claro */
//   color: #3d7d52; /* Verde Pastel */
//   color: rgb(139, 69, 19); /* Marrón */
//   color: #ffd700; /* Amarillo */
//   background-color: #d3d3d3; /* Gris Claro */
// */
const Contenedor= styled.div`
position: fixed;
right:2%;
bottom: 0%;
display: flex;
flex-direction: column;
background-color: #ffd700;
width:30%;
height: 50vh;
border-radius: 10% 10% 10% 10%;
 border: 5px solid #3d7d52;
justify-content:space-evenly;
align-items: center;
text-align: center;
color: #b2d8d8;
  z-index: 1000;
@media only screen and (max-width : 700px) {
  font-size: small; 
} 
` 
/* @media only screen and (max-width : 400px){
  top: 30%;
 width: 100%;
 height:100vh;
 overflow: scroll;
 border-radius: 0;
 font-size: x-large; }
  `; */

// const ImagenW = styled.img`
//               width: 70%;
//                align-content: center;
//                padding: -60px;

//                @media only screen and (max-width : 700px){
//   width: 50%;
//                  }  `;
              
const H1 = styled.h1`
color: #3d7d52;
align-items: center;
font-size: xx-large;
@media only screen and (max-width : 700px) {
  font-size: small; 
} 

`;

const StyledLink = styled(Link)`
flex-direction: column;
  color: #b2d8d8;
  cursor: pointer;
  padding: 5%;
  margin-top: 5%;
  justify-content: center;
  border-radius: 15px 15px 15px 15px;
  text-align: center;
  align-content: center;
  background-color: #3d7d52;
  font-size: 1rem;
  text-decoration: none;
  color: #d3d3d3; /* Gris Claro */
  z-index: 5000;
  

  &:hover {
    background-color: #b2d8d8;
    border: 2px solid rgb(139, 69, 19);
    color: #3d7d52;
  }
`;



const Pe =styled.p`
  font-size: 0.8em;
  color:rgb(139, 69, 19);
  justify-content: center;
`


export default function Form() {

return (
    <>
        <Contenedor>
        
               <H1> Dogs App</H1>
                <img style={{width:"30%"}}src={icono} alt="hueso"/>
                   <StyledLink to="/home">Ingresar</StyledLink>
         <Pe>No hace falta tener cuenta</Pe>
               </Contenedor>
          </>
)
}
