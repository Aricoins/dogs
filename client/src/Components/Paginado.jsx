import React from 'react';
import styled from 'styled-components';
import colores from '../vistas/colores';


const PaginadoContainer = styled.div`   
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colores.verde};
  padding: 20px;
  border-radius: 8px;
  ` ;

const BotonPagina = styled.button `  
  padding: 10px;
  background-color: ${colores.amarillo};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colores.gris};
  }
 `  ;

const Paginado = ({ totalPages, currentPage, handlePaginaChange  }) => {
  
    const generarNumerosPagina = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  const handlePaginaClick = (numeroPagina) => {
 
         handlePaginaChange(numeroPagina);

  };

  return (
    <PaginadoContainer>
      <div>
        <BotonPagina onClick={() => handlePaginaClick(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </BotonPagina>
        {generarNumerosPagina().map((numero) => (
          <BotonPagina
            key={numero}
            onClick={() => handlePaginaClick(numero)}
            style={{ backgroundColor: numero === currentPage ? colores.gris : colores.amarillo }}
          >
            {numero}
          </BotonPagina>
        ))}
        <BotonPagina onClick={() => handlePaginaClick(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </BotonPagina>
      </div>
      {/* <div>
        <p>Página actual: {currentPage}</p>
      </div> */}
    </PaginadoContainer>
  );
};

export default Paginado;