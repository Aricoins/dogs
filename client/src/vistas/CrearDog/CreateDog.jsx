import React, { useState } from "react";
import axios from "axios";
import colores from "../../vistas/colores"
import styled from "styled-components";

const Formulario = styled.div`
  margin-top: 5%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  background-color:${colores.amarillo};
  border-radius: 8px;
  box-shadow: 0 0 10px ${colores.verde};
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${colores.verde};
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      color: ${colores.verde};
      font-weight: bold;
      
    }

    input,
    textarea {
      padding: 10px;
      border: 1px solid ${colores.gris};
      border-radius: 4px;
    }

    button {
      background-color: ${colores.verde};    
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${colores.azul};
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      color: #dc3545;
      font-weight: bold;
    }
  }
`;

const CreateDog = () => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [anios, setAnios] = useState("");
  const [temperament, setTemperament] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Realizar validaciones personalizadas
    const newErrors = [];

    if (!nombre.match(/^[a-zA-Z ]+$/)) {
      newErrors.push("El nombre no puede contener símbolos ni números.");
    }

    // Agregar más validaciones aquí...

    if (newErrors.length === 0) {
      try {
        // Enviar datos al servidor para crear un nuevo perro
        const response = await axios.post("http://localhost:3001/post", {
          nombre,
          imagen,
          altura,
          peso,
          anios,
          temperament,
        });

        // Limpiar el formulario después de enviar
        resetForm();

        // Mostrar mensaje de éxito
        alert("Perro creado exitosamente.");
      } catch (error) {
        console.error("Error al crear el perro:", error);
        alert("Hubo un error al crear el perro.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setNombre("");
    setImagen("");
    setAltura("");
    setPeso("");
    setAnios("");
    setTemperament("");
    setErrors([]);
  };

  return (
    
    <Formulario>
      <h1>Creá tu Mascota</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="imagen">Imagen (URL):</label>
        <input
          type="url"
          id="imagen"
          name="imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />

        <label htmlFor="altura">Altura:</label>
        <input
          type="text"
          id="altura"
          name="altura"
          value={altura}
          placeholder="centímetros"
          onChange={(e) => setAltura(e.target.value)}
          required
        /> 

        <label htmlFor="peso">Peso:</label>
        <input
          type="text"
          id="peso"
          name="peso"
          value={peso}
          placeholder="kilogramos"
          onChange={(e) => setPeso(e.target.value)}
          required
        />

        <label htmlFor="anios">Años de Vida:</label>
        <input
          type="text"
          id="anios"
          name="anios"
          value={anios}
          onChange={(e) => setAnios(e.target.value)}
          required
        />

        <label htmlFor="temperament">Temperamento:</label>
        <input
          type="text"
          id="temperament"
          name="temperament"
          value={temperament}
          onChange={(e) => setTemperament(e.target.value)}
          required
        />

        <button type="submit">Crear Perro</button>
      </form>

      {errors.length > 0 && (
        <div>
          <h2>Errores:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </Formulario>
  );
};

export default CreateDog;
