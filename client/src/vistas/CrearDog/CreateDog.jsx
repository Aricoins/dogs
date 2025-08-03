import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import colores from '../../vistas/colores';
import styled, { keyframes } from 'styled-components';
import Nav from '../../Components/Nav';
import { useSelector } from 'react-redux';

// Validaciones
const nombreRegex = /^[a-zA-ZÀ-ÿ\s]+$/; // Permite letras y espacios, incluye acentos
const urlRegex = /^(ftp|http|https):\/\/[^\s]+$/;
const digito = /^\d+$/;
const alturaMinima = 10;
const alturaMaxima = 200;
const pesoMinimo = 1;
const pesoMaximo = 100;
const aniosMinimo = 1;
const aniosMaximo = 30;

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Contenedor principal
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Header = styled.div`
  background: linear-gradient(135deg, ${colores.amarillo} 0%, #f9ca24 100%);
  padding: 2rem;
  text-align: center;
  
  h1 {
    color: ${colores.verde};
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin: 0;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  p {
    color: ${colores.verde};
    opacity: 0.8;
    margin: 0.5rem 0 0 0;
    font-size: 1.1rem;
  }
`;

const FormContent = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${colores.verde};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#e0e0e0'};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.$hasError ? '#fdf2f2' : 'white'};
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#e74c3c' : colores.verde};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)'};
  }
  
  &::placeholder {
    color: #999;
  }
  
  ${props => props.$hasError && `animation: ${shake} 0.5s ease-in-out;`}
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${colores.verde};
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
  }
`;

const TemperamentContainer = styled.div`
  margin-bottom: 1rem;
`;

const TemperamentChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  min-height: 40px;
  padding: 0.5rem;
  border: 2px dashed #e0e0e0;
  border-radius: 10px;
  background: #f8f9fa;
`;

const Chip = styled.span`
  background: linear-gradient(135deg, ${colores.verde} 0%, #27ae60 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${fadeIn} 0.3s ease-out;
  
  button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 12px;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }
`;

const EmptyChipsMessage = styled.div`
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
  padding: 0.5rem;
  background: #fdf2f2;
  border-left: 3px solid #e74c3c;
  border-radius: 4px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SuccessMessage = styled.p`
  color: #27ae60;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.7;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${colores.verde} 0%, #27ae60 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingButton = styled(SubmitButton)`
  background: #95a5a6;
  cursor: not-allowed;
  
  &:after {
    content: '';
    display: inline-block;
    margin-left: 0.5rem;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const validation = (form) => {
  const errors = {};

  // Validación del nombre
  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es requerido';
  } else if (!nombreRegex.test(form.nombre.trim())) {
    errors.nombre = 'El nombre solo puede contener letras y espacios';
  } else if (form.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  // Validación de la imagen
  if (!form.imagen.trim()) {
    errors.imagen = 'La URL de la imagen es requerida';
  } else if (!urlRegex.test(form.imagen.trim())) {
    errors.imagen = 'Debe ser una URL válida (http, https o ftp)';
  }

  // Validación de altura
  if (!form.altura.trim()) {
    errors.altura = 'La altura es requerida';
  } else if (!digito.test(form.altura.trim())) {
    errors.altura = 'La altura debe ser un número';
  } else {
    const alturaNum = parseInt(form.altura.trim());
    if (alturaNum < alturaMinima || alturaNum > alturaMaxima) {
      errors.altura = `La altura debe estar entre ${alturaMinima} y ${alturaMaxima} cm`;
    }
  }

  // Validación de peso
  if (!form.peso.trim()) {
    errors.peso = 'El peso es requerido';
  } else if (!digito.test(form.peso.trim())) {
    errors.peso = 'El peso debe ser un número';
  } else {
    const pesoNum = parseInt(form.peso.trim());
    if (pesoNum < pesoMinimo || pesoNum > pesoMaximo) {
      errors.peso = `El peso debe estar entre ${pesoMinimo} y ${pesoMaximo} kg`;
    }
  }

  // Validación de años
  if (!form.anios.trim()) {
    errors.anios = 'Los años de vida son requeridos';
  } else if (!digito.test(form.anios.trim())) {
    errors.anios = 'Los años deben ser un número';
  } else {
    const aniosNum = parseInt(form.anios.trim());
    if (aniosNum < aniosMinimo || aniosNum > aniosMaximo) {
      errors.anios = `Los años deben estar entre ${aniosMinimo} y ${aniosMaximo}`;
    }
  }

  // Validación de temperamentos
  if (!Array.isArray(form.temperament) || form.temperament.length === 0) {
    errors.temperament = 'Debe seleccionar al menos un temperamento';
  } else if (form.temperament.length > 5) {
    errors.temperament = 'Máximo 5 temperamentos permitidos';
  }

  return errors;
};

const CreateDog = () => {
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    imagen: "",
    altura: "",
    peso: "",
    anios: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    
    // Validar en tiempo real
    const newErrors = validation(updatedForm);
    setErrors(newErrors);
  };

  const handleTemperamentSelect = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && !form.temperament.includes(selectedValue)) {
      const updatedForm = {
        ...form,
        temperament: [...form.temperament, selectedValue]
      };
      setForm(updatedForm);
      
      // Validar
      const newErrors = validation(updatedForm);
      setErrors(newErrors);
    }
    // Resetear el select
    event.target.value = "";
  };

  const removeTemperament = (temperamentToRemove) => {
    const updatedForm = {
      ...form,
      temperament: form.temperament.filter(temp => temp !== temperamentToRemove)
    };
    setForm(updatedForm);
    
    // Validar
    const newErrors = validation(updatedForm);
    setErrors(newErrors);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario completo
    const formErrors = validation(form);
    setErrors(formErrors);
    
    // Verificar si hay errores
    const hasErrors = Object.keys(formErrors).length > 0;
    
    if (!hasErrors) {
      setIsSubmitting(true);
      
      try {
        // Preparar datos para envío
        const dogData = {
          nombre: form.nombre.trim(),
          imagen: form.imagen.trim(),
          altura: parseInt(form.altura.trim()),
          peso: parseInt(form.peso.trim()),
          anios: parseInt(form.anios.trim()),
          temperament: form.temperament, // Enviar como array
        };

        console.log('Enviando datos:', dogData);

        const response = await axios.post('https://server-dogs-lr41.onrender.com/post', dogData);
        
        // Si la respuesta contiene el ID del perro creado
        const createdDogId = response.data.id || response.data.ID;
        
        // Mostrar mensaje de éxito
        alert(`¡${dogData.nombre} ha sido creado exitosamente!`);
        
        // Limpiar formulario
        setForm({
          nombre: "",
          imagen: "",
          altura: "",
          peso: "",
          anios: "",
          temperament: [],
        });
        setErrors({});
        
        // Redirigir al detalle del perro creado
        if (createdDogId) {
          history.push(`/detail/${createdDogId}`);
        } else {
          // Si no hay ID, redirigir a home
          history.push('/home');
        }
        
      } catch (error) {
        console.error("Error al crear el perro:", error);
        
        // Manejar diferentes tipos de errores
        if (error.response) {
          // Error del servidor
          const errorMessage = error.response.data?.message || error.response.data?.error || 'Error del servidor';
          alert(`Error: ${errorMessage}`);
        } else if (error.request) {
          // Error de conexión
          alert("Error de conexión. Verifica tu conexión a internet.");
        } else {
          // Otro tipo de error
          alert("Ocurrió un error inesperado. Inténtalo de nuevo.");
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Por favor, corrige los errores antes de enviar el formulario.");
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                      form.nombre && form.imagen && form.altura && 
                      form.peso && form.anios && form.temperament.length > 0;

  return (
    <Container>
      <FormContainer>
        <Header>
          <h1>🐕 Crear Nueva Mascota</h1>
          <p>Comparte tu compañero peludo con el mundo</p>
        </Header>
        
        <FormContent>
          <form onSubmit={handleFormSubmit}>
            <FormGroup $delay="0.1s">
              <Label htmlFor="nombre">Nombre de la mascota</Label>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Max, Luna, Rocky..."
                $hasError={!!errors.nombre}
              />
              {errors.nombre ? (
                <ErrorMessage>{errors.nombre}</ErrorMessage>
              ) : form.nombre && (
                <SuccessMessage>✓ Nombre válido</SuccessMessage>
              )}
            </FormGroup>

            <FormGroup $delay="0.2s">
              <Label htmlFor="imagen">URL de la imagen</Label>
              <Input
                type="url"
                id="imagen"
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                $hasError={!!errors.imagen}
              />
              {errors.imagen ? (
                <ErrorMessage>{errors.imagen}</ErrorMessage>
              ) : form.imagen && (
                <SuccessMessage>✓ URL válida</SuccessMessage>
              )}
            </FormGroup>

            <FormGroup $delay="0.3s">
              <Label htmlFor="altura">Altura (cm)</Label>
              <Input
                type="number"
                id="altura"
                name="altura"
                value={form.altura}
                onChange={handleChange}
                placeholder={`Entre ${alturaMinima} y ${alturaMaxima} cm`}
                $hasError={!!errors.altura}
                min={alturaMinima}
                max={alturaMaxima}
              />
              {errors.altura ? (
                <ErrorMessage>{errors.altura}</ErrorMessage>
              ) : form.altura && (
                <SuccessMessage>✓ Altura válida</SuccessMessage>
              )}
            </FormGroup>

            <FormGroup $delay="0.4s">
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input
                type="number"
                id="peso"
                name="peso"
                value={form.peso}
                onChange={handleChange}
                placeholder={`Entre ${pesoMinimo} y ${pesoMaximo} kg`}
                $hasError={!!errors.peso}
                min={pesoMinimo}
                max={pesoMaximo}
              />
              {errors.peso ? (
                <ErrorMessage>{errors.peso}</ErrorMessage>
              ) : form.peso && (
                <SuccessMessage>✓ Peso válido</SuccessMessage>
              )}
            </FormGroup>

            <FormGroup $delay="0.5s">
              <Label htmlFor="anios">Años de vida</Label>
              <Input
                type="number"
                id="anios"
                name="anios"
                value={form.anios}
                onChange={handleChange}
                placeholder={`Entre ${aniosMinimo} y ${aniosMaximo} años`}
                $hasError={!!errors.anios}
                min={aniosMinimo}
                max={aniosMaximo}
              />
              {errors.anios ? (
                <ErrorMessage>{errors.anios}</ErrorMessage>
              ) : form.anios && (
                <SuccessMessage>✓ Edad válida</SuccessMessage>
              )}
            </FormGroup>

            <FormGroup $delay="0.6s">
              <TemperamentContainer>
                <Label htmlFor="temperament">Temperamentos (máx. 5)</Label>
                <Select
                  id="temperament"
                  onChange={handleTemperamentSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona un temperamento
                  </option>
                  {temperaments
                    .filter(temp => !form.temperament.includes(temp.name))
                    .map((temp) => (
                      <option key={temp.ID} value={temp.name}>
                        {temp.name}
                      </option>
                    ))}
                </Select>
                
                <TemperamentChips>
                  {form.temperament.length > 0 ? (
                    form.temperament.map((temp, index) => (
                      <Chip key={index}>
                        {temp}
                        <button
                          type="button"
                          onClick={() => removeTemperament(temp)}
                          aria-label={`Remover ${temp}`}
                        >
                          ×
                        </button>
                      </Chip>
                    ))
                  ) : (
                    <EmptyChipsMessage>
                      Los temperamentos seleccionados aparecerán aquí
                    </EmptyChipsMessage>
                  )}
                </TemperamentChips>
                
                {errors.temperament ? (
                  <ErrorMessage>{errors.temperament}</ErrorMessage>
                ) : form.temperament.length > 0 && (
                  <SuccessMessage>
                    ✓ {form.temperament.length} temperamento{form.temperament.length > 1 ? 's' : ''} seleccionado{form.temperament.length > 1 ? 's' : ''}
                  </SuccessMessage>
                )}
              </TemperamentContainer>
            </FormGroup>

            <FormGroup $delay="0.7s">
              {isSubmitting ? (
                <LoadingButton disabled>
                  Creando mascota...
                </LoadingButton>
              ) : (
                <SubmitButton
                  type="submit"
                  disabled={!isFormValid}
                >
                  🎉 Crear Mi Mascota
                </SubmitButton>
              )}
            </FormGroup>
          </form>
        </FormContent>
      </FormContainer>
      
      <Nav />
    </Container>
  );
};

export default CreateDog;
