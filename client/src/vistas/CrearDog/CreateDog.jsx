import React, { useState} from 'react';
import axios from 'axios';
import colores from '../../vistas/colores';
import styled from 'styled-components';
import styles from './CreateDog.modules.css';
import Nav from '../../Components/Nav';
import { useSelector } from 'react-redux';
//import validation from "../CrearDog/validation"


const nombreRegex = /^[^\d]+$/; // El nombre no puede incluir números
const urlRegex = /^(ftp|http|https):\/\/[^\s]+$/; // Valida las URL que comienzan con ftp, http, o https, seguido por ://, y luego cualquier caracter que no sea un espacio en blanco
const digito = /^\d+$/;  // Valida que el campo contenga solo números
const alturaMinima = 10;
const alturaMaxima = 2000;
const pesoMinimo = 1;
const pesoMaximo = 500;

const validation = (form, setErrors, errors) => {
  if (!form.nombre) errors.nombre = 'Este campo es requerido';
  else errors.nombre = "";

  if (!urlRegex.test(form.imagen)) errors.imagen = "Debe ser una url / ftp, http, o https";
  else errors.imagen = "";

  if (!nombreRegex.test(form.nombre)) errors.nombre = "No incluyas números";
  else errors.nombre = "";

  if (!digito.test(form.altura)) errors.altura = `Un número entre ${alturaMinima} y ${alturaMaxima} centimetros`;
  else errors.altura = "";

  if (digito.test(form.altura)) {
    const alturaNum = parseInt(form.altura);
    if (alturaNum < alturaMinima || alturaNum > alturaMaxima) {
      errors.altura = `La altura debe estar entre ${alturaMinima} y ${alturaMaxima} centímetros`;
    } else {
      errors.altura = "";
    }
  }

  if (digito.test(form.peso)) {
    const pesoNum = parseInt(form.peso);
    if (pesoNum < pesoMinimo || pesoNum > pesoMaximo) {
      errors.peso = `El peso debe estar entre ${pesoMinimo} y ${pesoMaximo} kilogramos`;
    } else {
      errors.peso = "";
    }
  }

  if (!digito.test(form.anios) || parseInt(form.anios) <= 0) {
    errors.anios = "Ingresa un número válido de años de vida";
  } else {
    errors.anios = "";
  }

};


const Caja = styled.div`
  margin-top: 5%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding:5%;
  background-color: ${colores.amarillo};
  border-radius: 8px;
  box-shadow: 0 0 10px ${colores.verde};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-items: center;
  align-content: center;
margin-bottom: 10%;

  h1 {
    color: ${colores.verde}; 
  }
p{
  background-color: #ff006a;
font-size:large;
color: white

}
    label {
      font-weight: bold;
      width: 100%;
      padding: 5%;
    }

    input,
    textarea {
      padding: 10px;
      border: 1px solid ${colores.gris};
      border-radius: 4px;
      color: ${colores.black};
      width: 100%; }

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
      }
    }

  ul {
    list-style: none;
    padding: 0;

    li {
      color: #dc3545;
      font-weight: bold;
    }
    span{
      font-size: 12px;
    }
  }`;

const Boton = styled.button`
 background-color: ${colores.verde};
      padding: 10px;
      border: none;
      border-radius: 5%;
      cursor: pointer;
      transition: background-color 0.3s;
      color: ${colores.gris}; /* Cambiado a color más claro */
      width: 100%;
      font-size: large;
      &:hover {
        background-color: ${colores.marron};
        color: ${colores.amarillo};
       
         width: 100%;
      }

`


const CreateDog = () => {
const temperaments = useSelector((state) => state.temperaments);
 // const [temperaments, setTemperaments] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    imagen: "",
    altura:"",
    peso: "",
    anios: "",
    temperament: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    imagen: "",
    altura:"",
    peso: "",
    anios: "",
    temperament:"",
  });
  const handleChangeSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setForm((prevForm) => ({ ...prevForm, temperament: selectedOptions }));
  };
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [property]: value };

      // Use the state temperaments instead of the value of the temperament field
      validation(updatedForm, (newErrors) => setErrors(newErrors), errors);

      return updatedForm;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Validar el formulario antes de enviar
    validation(form, (newErrors) => setErrors(newErrors), errors);
  
    // Verificar si hay algún error en el formulario
    const hasErrors = Object.values(errors).some((error) => error !== "");
  
    if (!hasErrors) {
      try {
        // Enviar datos al servidor para crear un nuevo perro
        const { nombre, imagen, altura, peso, anios, temperament } = form;
  
 
  
        await axios.post('https://server-dogs-lr41.onrender.com/post', {
          imagen,
          nombre,
          altura,
          peso,
          anios,
          temperament,
        });
  
        // Limpiar el formulario después de enviar
        const resetForm = () =>
          setForm({
            nombre: "",
            imagen: "",
            altura: "",
            peso: "",
            anios: "",
            temperament: [],
          });
        resetForm();
  
        // Mostrar mensaje de éxito
        alert(`La ${temperamentString} mascota ${nombre} se ha creado exitosamente`);
      } catch (error) {
        console.error("Error al crear el perro:", error);
        alert("Hubo un error al crear el perro.", error);
      }
    } else {
      console.log(errors);
      alert("Por favor, corrige los errores antes de enviar el formulario.");
    }
  };
  

  


  return (
    <>
    <Caja>
        <h1>Creá tu Mascota</h1>
            <form onSubmit={handleFormSubmit}>
      <div>  
          <label htmlFor="nombre">Nombre:</label>
      <input   name="nombre"
      type="text"
      id="nombre"
      value={form.nombre}
      onChange={handleChange}
      className={errors.nombre ? styles.mal : styles.bien}
        />
      <span>{errors.nombre ? <p>{errors.nombre}</p> :<p style = {{color:`${colores.amarillo}`, backgroundColor: `${colores.amarillo}`}}>No hay errores</p>}</span> 
      </div>
      <div>
            <label htmlFor="imagen">Imagen (URL):</label>
            <input
      type="url"
      id="imagen"
      name="imagen"
      value={form.imagen}
      onChange={handleChange}
      className={errors.imagen ? styles.mal : styles.bien}
    />
      <span>{errors.imagen ? <p>{errors.imagen}</p> :<p style = {{color:`${colores.amarillo}`, backgroundColor: `${colores.amarillo}`}}>No hay errores</p>}</span> 
      </div>

      <div> <label htmlFor="altura">Altura:</label>
      <input
        type="text"
        id="altura"
        name="altura"
        value={form.altura}
        placeholder="centímetros"
        onChange={handleChange}
          className={errors.nombre ? styles.mal : styles.bien}
      
      />
        <span>{errors.altura ? <p>{errors.altura}</p> :<p style = {{color:`${colores.amarillo}`, backgroundColor: `${colores.amarillo}`}}>No hay errores</p>}</span> 
                    
      </div>   
      <div> 
      <label htmlFor="peso">Peso:</label>
      <input
        type="text"
        id="peso"
        name="peso"
        value={form.peso}
        placeholder="kilogramos"
        onChange={handleChange}
      />
      
      <span>{errors.peso ? <p>{errors.peso}</p> :<p style = {{color:`${colores.amarillo}`, backgroundColor: `${colores.amarillo}`}}>No hay errores</p>}</span> 

      </div>
      <div>
            <label htmlFor="anios">Años de Vida:</label>
      <input
        type="text"
        id="anios"
        name="anios"
        value={form.anios}
    onChange={handleChange}
                />
            <span>{errors.anios ? <p>{errors.anios}</p> :<p style = {{color:`${colores.amarillo}`, backgroundColor: `${colores.amarillo}`}}>No hay errores</p>}</span> 

      </div>
      <div>
            <label htmlFor="temperament">Temperamentos:</label>
            <select
            style={{width: "100%"}}
              id="temperament"
              name="temperament"
              value={form.temperament}
              onChange={handleChangeSelect}
              multiple
            >
              {temperaments.map((temp) => (
                <option key={temp.ID} value={temp.name}>
                  {temp.name}
                </option>
              ))}
            </select>
            <span>
              {errors.temperament ? (
                <p>{errors.temperament}</p>
              ) : (
                <p style={{ color: `${colores.amarillo}`, backgroundColor: `${colores.amarillo}` }}>
                  No hay errores
                </p>
              )}
            </span>
          </div>
 { errors.altura || errors.peso || errors.anios  || errors.nombre || errors.imagen  || errors.temperament 
      ?
      null 
      :
       <Boton type="submit" onSubmit={handleFormSubmit} >
            Crear Mascota
          </Boton>  }

                 </form>  
                 
    </Caja>
    <Nav/>
    </>
  );
 };
  
export default CreateDog;

