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
    &:active{ 
     background-color: ${colores.verde};
color: ${colores.marron}; }

 :hover{
  width: 100%;
  cursor:pointer;
} @media screen and (max-width : 700px) {

  font-size: 10px;
}

`

const StyledLink = styled(NavLink)`
  text-decoration: none;
  text-decoration: none;
    color: ${colores.azul};
  background-color:  ${colores.marron};
  width:15%;
  display: inline-block;
  border-radius: 8%;
  transition-duration: 1s;
  z-index: 7;
   &active{
    background-color: ${colores.marron};;
    font-weight: bold;
    color: ${colores.azul};
    
  }
  &:hover{
    align-self: center;
    width: 100%;
  }
  `

export default function Nav (props){

    return(
        <>
      
        <Navigator>
       <StyledLink to="/home"> <Botones> Inicio </Botones> </StyledLink>
       <StyledLink to="/form"> <Botones> Crear Mascota </Botones> </StyledLink>
       <StyledLink to="/portfolio"> <Botones> About </Botones> </StyledLink>
       </Navigator>
     </>
              )
}