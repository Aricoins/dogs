import styled from "styled-components";
import React from "react";
import { useState } from "react";
import colores from "../vistas/colores";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";

const Barra = styled.nav`
display: flex;
flex-direction: row;
padding: 1%;
padding-bottom: 1%;
border-radius: 10px;
border-color: ${colores.marron};
display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center; 
  background-color: ${colores.amarillo};
  top: 0%
`

const Input= styled.input`

border-color: ${colores.verde};
height: 3rem; 
    color: ${colores.amarillo};
    width: 60%;
    height: 2em;
    text-align: center;
    text-decoration: none;
    font-size: 2rem;
    border-radius: 8%;
    border: 0.08em solid black;
    transition-duration: 0.8s;
`

const Boton = styled.button`
    background-color: ${colores.verde};
    color: ${colores.amarillo};
    width: 30%;
    height: 2em;
    text-align: center;
    text-decoration: none;
    font-size: 2rem;
    border-radius: 8%;
    border: 0.08em solid black;
    transition-duration: 0.8s;
    cursor: pointer;
       :hover{
       background-color: white;
        border-color: ${colores.verde};
        border-bottom: #09090e;
      color: #080000;
        cursor: pointer;
      }
`

export default function SearchBar() {

  const history = useHistory();
  const [results, setResults] = useState("");
const [input, setInput] = useState('')  ;


function handleChange(event){
 
  setInput(event.target.value)
}


const handleSubmit = async (event) => {
event.preventDefault();
  try {
    const response = await axios.get(`http://localhost:3001/dogs/name?nombre=${input}`);
    // Actualiza el estado con los resultados de la búsqueda
    setResults(response.data);
    const firstResult = response.data[0];
console.log(firstResult)
    // Redirect to the Detail component with the id as a parameter
    history.push(`/detail/${firstResult.id}`);

  } catch (error) {
    console.error("Error al buscar:", error);
  }
};


  return (<>
    <Barra>      
       <form onSubmit={handleSubmit}>
        <lavel htmlFor="buscar"></lavel>
        <Boton type="submit">Buscar</Boton>
         <Input type='search' placeholder="por Palabra" name="buscar" value={input} onChange={handleChange} />
        
                
        </form>


        </Barra>
  
    
</>
)}
