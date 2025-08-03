import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import colores from '../../vistas/colores';
import Nav from '../../Components/Nav';
import { useSelector } from 'react-redux';

// Validaciones
const nombreRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
const urlRegex = /^(ftp|http|https):\/\/[^\s]+$/;
const digito = /^\d+$/;
const alturaMinima = 10;
const alturaMaxima = 200;
const pesoMinimo = 1;
const pesoMaximo = 100;
const aniosMinimo = 1;
const aniosMaximo = 30;

const validation = (form) => {
  const errors = {};

  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es requerido';
  } else if (!nombreRegex.test(form.nombre.trim())) {
    errors.nombre = 'El nombre solo puede contener letras y espacios';
  } else if (form.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!form.imagen.trim()) {
    errors.imagen = 'La URL de la imagen es requerida';
  } else if (!urlRegex.test(form.imagen.trim())) {
    errors.imagen = 'Debe ser una URL válida (http, https o ftp)';
  }

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
      
      const newErrors = validation(updatedForm);
      setErrors(newErrors);
    }
    event.target.value = "";
  };

  const removeTemperament = (temperamentToRemove) => {
    const updatedForm = {
      ...form,
      temperament: form.temperament.filter(temp => temp !== temperamentToRemove)
    };
    setForm(updatedForm);
    
    const newErrors = validation(updatedForm);
    setErrors(newErrors);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validation(form);
    setErrors(formErrors);
    
    const hasErrors = Object.keys(formErrors).length > 0;
    
    if (!hasErrors) {
      setIsSubmitting(true);
      
      try {
        const dogData = {
          nombre: form.nombre.trim(),
          imagen: form.imagen.trim(),
          altura: parseInt(form.altura.trim()),
          peso: parseInt(form.peso.trim()),
          anios: parseInt(form.anios.trim()),
          temperament: form.temperament,
        };

        console.log('Enviando datos:', dogData);

        const response = await axios.post('https://server-dogs-lr41.onrender.com/post', dogData);
        
        const createdDogId = response.data.id || response.data.ID;
        
        alert(`¡${dogData.nombre} ha sido creado exitosamente!`);
        
        setForm({
          nombre: "",
          imagen: "",
          altura: "",
          peso: "",
          anios: "",
          temperament: [],
        });
        setErrors({});
        
        if (createdDogId) {
          history.push(`/detail/${createdDogId}`);
        } else {
          history.push('/home');
        }
        
      } catch (error) {
        console.error("Error al crear el perro:", error);
        
        if (error.response) {
          const errorMessage = error.response.data?.message || error.response.data?.error || 'Error del servidor';
          alert(`Error: ${errorMessage}`);
        } else if (error.request) {
          alert("Error de conexión. Verifica tu conexión a internet.");
        } else {
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

  // Estilos como objetos
  const styles = {
    // CSS animations
    keyframes: `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes chipFadeIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
    
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem 1rem',
    },
    
    containerMobile: {
      padding: '1rem 0.5rem',
    },
    
    formContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      animation: 'fadeIn 0.8s ease-out',
    },
    
    header: {
      background: `linear-gradient(135deg, ${colores.amarillo} 0%, #f9ca24 100%)`,
      padding: '2rem',
      textAlign: 'center',
    },
    
    headerTitle: {
      color: colores.verde,
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      margin: 0,
      fontWeight: 800,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    
    headerSubtitle: {
      color: colores.verde,
      opacity: 0.8,
      margin: '0.5rem 0 0 0',
      fontSize: '1.1rem',
    },
    
    formContent: {
      padding: '2rem',
    },
    
    formContentMobile: {
      padding: '1.5rem',
    },
    
    formGroup: (delay, hasError) => ({
      marginBottom: '1.5rem',
      animation: `slideIn 0.6s ease-out ${delay} both`,
      ...(hasError && { animation: 'shake 0.5s ease-in-out' }),
    }),
    
    label: {
      display: 'block',
      fontWeight: 600,
      color: colores.verde,
      marginBottom: '0.5rem',
      fontSize: '1.1rem',
    },
    
    input: (hasError) => ({
      width: '100%',
      padding: '12px 16px',
      border: `2px solid ${hasError ? '#e74c3c' : '#e0e0e0'}`,
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: hasError ? '#fdf2f2' : 'white',
      boxSizing: 'border-box',
    }),
    
    inputFocus: (hasError) => ({
      outline: 'none',
      borderColor: hasError ? '#e74c3c' : colores.verde,
      boxShadow: `0 0 0 3px ${hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)'}`,
    }),
    
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1rem',
      background: 'white',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
    },
    
    temperamentChips: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '0.5rem',
      minHeight: '40px',
      padding: '0.5rem',
      border: '2px dashed #e0e0e0',
      borderRadius: '10px',
      background: '#f8f9fa',
    },
    
    chip: {
      background: `linear-gradient(135deg, ${colores.verde} 0%, #27ae60 100%)`,
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      animation: 'chipFadeIn 0.3s ease-out',
    },
    
    chipButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'white',
      fontSize: '12px',
      transition: 'all 0.2s ease',
    },
    
    chipButtonHover: {
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'scale(1.1)',
    },
    
    emptyMessage: {
      color: '#999',
      fontStyle: 'italic',
      textAlign: 'center',
      padding: '0.5rem',
    },
    
    errorMessage: {
      color: '#e74c3c',
      fontSize: '0.9rem',
      margin: '0.5rem 0 0 0',
      padding: '0.5rem',
      background: '#fdf2f2',
      borderLeft: '3px solid #e74c3c',
      borderRadius: '4px',
      animation: 'fadeIn 0.3s ease-out',
    },
    
    successMessage: {
      color: '#27ae60',
      fontSize: '0.9rem',
      margin: '0.5rem 0 0 0',
      opacity: 0.7,
    },
    
    submitButton: (disabled) => ({
      width: '100%',
      background: disabled ? '#95a5a6' : `linear-gradient(135deg, ${colores.verde} 0%, #27ae60 100%)`,
      color: 'white',
      border: 'none',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: disabled ? 'none' : '0 4px 15px rgba(46, 204, 113, 0.3)',
      opacity: disabled ? 0.6 : 1,
    }),
    
    loadingButton: {
      width: '100%',
      background: '#95a5a6',
      color: 'white',
      border: 'none',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'not-allowed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  // Media query detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{styles.keyframes}</style>
      
      <div style={{
        ...styles.container,
        ...(isMobile && styles.containerMobile)
      }}>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>🐕 Crear Nueva Mascota</h1>
            <p style={styles.headerSubtitle}>Comparte tu compañero peludo con el mundo</p>
          </div>
          
          <div style={{
            ...styles.formContent,
            ...(isMobile && styles.formContentMobile)
          }}>
            <form onSubmit={handleFormSubmit}>
              
              <div style={styles.formGroup('0.1s', errors.nombre)}>
                <label htmlFor="nombre" style={styles.label}>
                  Nombre de la mascota
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Max, Luna, Rocky..."
                  style={styles.input(!!errors.nombre)}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus(!!errors.nombre))}
                  onBlur={(e) => Object.assign(e.target.style, styles.input(!!errors.nombre))}
                />
                {errors.nombre ? (
                  <p style={styles.errorMessage}>{errors.nombre}</p>
                ) : form.nombre && (
                  <p style={styles.successMessage}>✓ Nombre válido</p>
                )}
              </div>

              <div style={styles.formGroup('0.2s', errors.imagen)}>
                <label htmlFor="imagen" style={styles.label}>
                  URL de la imagen
                </label>
                <input
                  type="url"
                  id="imagen"
                  name="imagen"
                  value={form.imagen}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  style={styles.input(!!errors.imagen)}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus(!!errors.imagen))}
                  onBlur={(e) => Object.assign(e.target.style, styles.input(!!errors.imagen))}
                />
                {errors.imagen ? (
                  <p style={styles.errorMessage}>{errors.imagen}</p>
                ) : form.imagen && (
                  <p style={styles.successMessage}>✓ URL válida</p>
                )}
              </div>

              <div style={styles.formGroup('0.3s', errors.altura)}>
                <label htmlFor="altura" style={styles.label}>
                  Altura (cm)
                </label>
                <input
                  type="number"
                  id="altura"
                  name="altura"
                  value={form.altura}
                  onChange={handleChange}
                  placeholder={`Entre ${alturaMinima} y ${alturaMaxima} cm`}
                  style={styles.input(!!errors.altura)}
                  min={alturaMinima}
                  max={alturaMaxima}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus(!!errors.altura))}
                  onBlur={(e) => Object.assign(e.target.style, styles.input(!!errors.altura))}
                />
                {errors.altura ? (
                  <p style={styles.errorMessage}>{errors.altura}</p>
                ) : form.altura && (
                  <p style={styles.successMessage}>✓ Altura válida</p>
                )}
              </div>

              <div style={styles.formGroup('0.4s', errors.peso)}>
                <label htmlFor="peso" style={styles.label}>
                  Peso (kg)
                </label>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  value={form.peso}
                  onChange={handleChange}
                  placeholder={`Entre ${pesoMinimo} y ${pesoMaximo} kg`}
                  style={styles.input(!!errors.peso)}
                  min={pesoMinimo}
                  max={pesoMaximo}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus(!!errors.peso))}
                  onBlur={(e) => Object.assign(e.target.style, styles.input(!!errors.peso))}
                />
                {errors.peso ? (
                  <p style={styles.errorMessage}>{errors.peso}</p>
                ) : form.peso && (
                  <p style={styles.successMessage}>✓ Peso válido</p>
                )}
              </div>

              <div style={styles.formGroup('0.5s', errors.anios)}>
                <label htmlFor="anios" style={styles.label}>
                  Años de vida
                </label>
                <input
                  type="number"
                  id="anios"
                  name="anios"
                  value={form.anios}
                  onChange={handleChange}
                  placeholder={`Entre ${aniosMinimo} y ${aniosMaximo} años`}
                  style={styles.input(!!errors.anios)}
                  min={aniosMinimo}
                  max={aniosMaximo}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus(!!errors.anios))}
                  onBlur={(e) => Object.assign(e.target.style, styles.input(!!errors.anios))}
                />
                {errors.anios ? (
                  <p style={styles.errorMessage}>{errors.anios}</p>
                ) : form.anios && (
                  <p style={styles.successMessage}>✓ Edad válida</p>
                )}
              </div>

              <div style={styles.formGroup('0.6s', errors.temperament)}>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="temperament" style={styles.label}>
                    Temperamentos (máx. 5)
                  </label>
                  <select
                    id="temperament"
                    onChange={handleTemperamentSelect}
                    defaultValue=""
                    style={styles.select}
                    onFocus={(e) => Object.assign(e.target.style, {
                      ...styles.select,
                      borderColor: colores.verde,
                      boxShadow: '0 0 0 3px rgba(46, 204, 113, 0.1)'
                    })}
                    onBlur={(e) => Object.assign(e.target.style, styles.select)}
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
                  </select>
                  
                  <div style={styles.temperamentChips}>
                    {form.temperament.length > 0 ? (
                      form.temperament.map((temp, index) => (
                        <span key={index} style={styles.chip}>
                          {temp}
                          <button
                            type="button"
                            onClick={() => removeTemperament(temp)}
                            aria-label={`Remover ${temp}`}
                            style={styles.chipButton}
                            onMouseEnter={(e) => Object.assign(e.target.style, {
                              ...styles.chipButton,
                              ...styles.chipButtonHover
                            })}
                            onMouseLeave={(e) => Object.assign(e.target.style, styles.chipButton)}
                          >
                            ×
                          </button>
                        </span>
                      ))
                    ) : (
                      <div style={styles.emptyMessage}>
                        Los temperamentos seleccionados aparecerán aquí
                      </div>
                    )}
                  </div>
                  
                  {errors.temperament ? (
                    <p style={styles.errorMessage}>{errors.temperament}</p>
                  ) : form.temperament.length > 0 && (
                    <p style={styles.successMessage}>
                      ✓ {form.temperament.length} temperamento{form.temperament.length > 1 ? 's' : ''} seleccionado{form.temperament.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>

              <div style={styles.formGroup('0.7s')}>
                {isSubmitting ? (
                  <button disabled style={styles.loadingButton}>
                    Creando mascota...
                    <div style={styles.spinner}></div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    style={styles.submitButton(!isFormValid)}
                    onMouseEnter={(e) => {
                      if (!e.target.disabled) {
                        Object.assign(e.target.style, {
                          ...styles.submitButton(false),
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(46, 204, 113, 0.4)'
                        });
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.target.disabled) {
                        Object.assign(e.target.style, styles.submitButton(false));
                      }
                    }}
                    onMouseDown={(e) => {
                      if (!e.target.disabled) {
                        Object.assign(e.target.style, {
                          ...styles.submitButton(false),
                          transform: 'translateY(0)'
                        });
                      }
                    }}
                    onMouseUp={(e) => {
                      if (!e.target.disabled) {
                        Object.assign(e.target.style, {
                          ...styles.submitButton(false),
                          transform: 'translateY(-2px)'
                        });
                      }
                    }}
                  >
                    🎉 Crear Mi Mascota
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <Nav />
      </div>
    </>
  );
};

export default CreateDog;
