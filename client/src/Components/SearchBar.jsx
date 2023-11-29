import styled from "styled-components";
import React from "react";
import { useState } from "react";
import colores from "../vistas/colores";
import axios from "axios";
import { useDispatch } from "react-redux";
import { applyFilters } from "../redux/actions/dogsActions";

const Barra = styled.nav`
  position: absolute;
  display: flex;
  padding: 1%;
  padding-bottom: 1%;
  border-radius: 10px;
  border-color: ${colores.marron};
  display: flex;
  background-color: ${colores.amarillo};
  right: 10px;
  top: 32px;
`;

const Input = styled.input`
  border-color: ${colores.verde};
  color: ${colores.amarillo};
  width: 60%;
  height: 2em;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 8%;
  border: 0.2em solid ${colores.verde};
  transition-duration: 0.8s;
`;

const Boton = styled.button`
  background-color: ${colores.amarillo};
  color: ${colores.verde};
  width: 30%;
  height: 2em;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 8%;
  border: 0.2em solid ${colores.verde};
  transition-duration: 0.8s;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${colores.verde};
    border-color: ${colores.verde};
    border-bottom: ${colores.marron};
    color: ${colores.amarillo};
    cursor: pointer;
  }
`;

export default function SearchBar() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://server-dogs-lr41.onrender.com/dogs/name?nombre=${input}`);
      const resultados = response.data;

      // No necesitas guardar los resultados en el estado local
      // setResults(resultados);

      // Enviar los resultados directamente a la acción applyFilters
      dispatch(applyFilters(resultados));
    } catch (error) {
      console.error("Error al buscar:", error);
      console.log(error.message);
      alert("No se encontraron resultados");
    }
  };

  return (
    <>
      <Barra>
        <form onSubmit={handleSubmit}>
          <label htmlFor="buscar"></label>
          <Boton type="submit">Buscar</Boton>
          <Input type='search' placeholder="por raza" name="buscar" value={input} onChange={(e) => setInput(e.target.value)} />
        </form>
      </Barra>
    </>
  );
}
