import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import colores from '../vistas/colores'

const Navigator = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${colores.white};
  box-shadow: ${colores.strongShadow};
  border-top: 1px solid ${colores.lightGrey};
  
  @media screen and (max-width: 768px) {
    position: sticky;
    bottom: auto;
    top: 0;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 12px 20px;
  gap: 8px;
  
  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    gap: 4px;
  }
`;

const NavButton = styled.button`
  background: ${colores.lightGrey};
  color: ${colores.primary};
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  text-transform: capitalize;
  letter-spacing: 0.3px;
  
  &:hover {
    background: ${colores.primaryGradient};
    color: ${colores.white};
    transform: translateY(-2px);
    box-shadow: ${colores.mediumShadow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 10px 16px;
    min-width: auto;
    flex: 1;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  flex: 1;
  
  &.active {
    ${NavButton} {
      background: ${colores.primaryGradient};
      color: ${colores.white};
      box-shadow: ${colores.softShadow};
    }
  }
  
  &:hover {
    text-decoration: none;
  }
  
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;


export default function Nav(props) {
  return (
    <Navigator>
      <NavContainer>
        <StyledLink exact to="/" activeClassName="active">
          <NavButton>Inicio</NavButton>
        </StyledLink>
        <StyledLink to="/home" activeClassName="active">
          <NavButton>Dogs App</NavButton>
        </StyledLink>
        <StyledLink to="/form" activeClassName="active">
          <NavButton>Crear Mascota</NavButton>
        </StyledLink>
        <StyledLink to="/about" activeClassName="active">
          <NavButton>Acerca de</NavButton>
        </StyledLink>
      </NavContainer>
    </Navigator>
  );
}