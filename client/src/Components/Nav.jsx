import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import colores from '../vistas/colores'

const Navigator= styled.div`
 position: fixed;
       z-index: 1000;
    bottom: 1%;
   width:100%;
   left: 0%;
   height: 11%;
background-color: ${colores.amarillo};

opacity: 1;
display: flex;
justify-content: center;
align-items: center;
align-content: center;

 @media screen and (max-width : 700px) {
top: 100%;
  width: 90%;
}
`

const Botones = styled.button`
border: ${colores.verde} solid 4px ;
color:  ${colores.verde};
background:  ${colores.azul};
font-size: 14px;
display: flex;
justify-content: center;
align-items: center;  
align-content: center;
margin: 2px;
  border-radius: 0% 0% 0% 10%;
  transition-duration: 0.5s;
  z-index: 7;
  padding: 0px;
    transition-duration: 1s;
    width: 100%;
    cursor: pointer;
   :hover{
  width: 60%;
  cursor:pointer;
} @media screen and (max-width : 700px) {

  font-size: 10px;
}

`

const StyledLink = styled(NavLink)`
  text-decoration: none;
  text-decoration: none;
    color: ${colores.marron};
  background-color:  ${colores.marron};
  width:15%;
  display: inline-block;
  border-radius: 8%;
  transition-duration: 1s;
  z-index: 7;
   &active{
    background-color: ${colores.verde};
    font-weight: bold;
    color: ${colores.marron};
    
  }
  &:hover{
    align-self: center;
    width: 40%;
    color:red
  }
  button {
      background-color: ${colores.verde};
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      color: ${colores.gris}; /* Cambiado a color más claro */

      &:hover {
        background-color: ${colores.marron};
        color: ${colores.amarillo};
        font-size: 110%;
      }
    }
    &:active{ 
     background-color: ${colores.verde};
color: ${colores.marron}; }

 
  `


export default function Nav (props){

    return(
        <>
      
        <Navigator>
       <StyledLink to="/"> <Botones> Inicio </Botones> </StyledLink>
       <StyledLink to="/form"> <Botones> Crear Mascota </Botones> </StyledLink>
       <StyledLink to="/about"> <Botones> About </Botones> </StyledLink>
       </Navigator>
     </>
              )
}