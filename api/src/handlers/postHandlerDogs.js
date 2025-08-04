const createDogs = require("../controllers/createDogs")

// Función de validación y sanitización
const validateDogInput = (data) => {
  const errors = [];
  
  // Validar nombre
  if (!data.nombre || typeof data.nombre !== 'string') {
    errors.push('Nombre es requerido y debe ser texto');
  } else if (data.nombre.length < 2 || data.nombre.length > 50) {
    errors.push('Nombre debe tener entre 2 y 50 caracteres');
  }
  
  // Validar imagen (URL)
  if (!data.imagen || typeof data.imagen !== 'string') {
    errors.push('Imagen es requerida y debe ser una URL');
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(data.imagen)) {
    errors.push('Imagen debe ser una URL válida de imagen');
  }
  
  // Validar altura
  const altura = parseFloat(data.altura);
  if (isNaN(altura) || altura <= 0 || altura > 200) {
    errors.push('Altura debe ser un número entre 1 y 200 cm');
  }
  
  // Validar peso  
  const peso = parseFloat(data.peso);
  if (isNaN(peso) || peso <= 0 || peso > 200) {
    errors.push('Peso debe ser un número entre 1 y 200 kg');
  }
  
  // Validar años
  const anios = parseInt(data.anios);
  if (isNaN(anios) || anios <= 0 || anios > 30) {
    errors.push('Años debe ser un número entre 1 y 30');
  }
  
  // Procesar temperament - puede venir como string o array
  let processedTemperament = '';
  if (data.temperament) {
    if (typeof data.temperament === 'string') {
      processedTemperament = data.temperament.trim();
    } else if (Array.isArray(data.temperament)) {
      processedTemperament = data.temperament.join(', ');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      nombre: data.nombre?.trim(),
      imagen: data.imagen?.trim(),
      altura,
      peso,
      anios,
      temperament: processedTemperament
    }
  };
};

const postHandlerDogs = async (req, res)=>{
  console.log('📨 Datos recibidos en POST:', req.body);
  
  // Validar entrada
  const validation = validateDogInput(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: validation.errors
    });
  }
  
  const { nombre, imagen, altura, peso, anios, temperament } = validation.sanitizedData;

  try {
    const newDog = await createDogs(nombre, imagen, altura, peso, anios, temperament);
    console.log('🎉 Perro creado exitosamente:', newDog.nombre);
    res.status(201).json({
      message: `${nombre} se ha creado con éxito!`,
      dog: {
        id: newDog.id,
        nombre: newDog.nombre
      }
    });
  } catch (error) {
    console.error('🚨 Error en postHandlerDogs:', error.message);
    res.status(400).json({error: error.message});
  }
}
} 
module.exports = postHandlerDogs