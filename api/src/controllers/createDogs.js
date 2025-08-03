const { Dog, Temperament, DogTemperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios, temperament }; // Guardar como string
  console.log(dogData);
  
  try {
    // Crear un nuevo perro en la base de datos
    const newDog = await Dog.create(dogData);
    
    // Procesar los temperamentos del string
    if (temperament && typeof temperament === 'string') {
      // Dividir por comas y limpiar espacios
      const temperamentNames = temperament.split(',').map(t => t.trim());
      
      // Procesar cada temperamento
      for (const tempName of temperamentNames) {
        const temperamento = await Temperament.findOne({
          where: { name: tempName },
        });
        if (temperamento) {
          await newDog.addTemperament(temperamento.id);
        }
      }
    }
    
    // Buscar el perro con los temperamentos asociados
    const result = await Dog.findAll({
      where: { id },
      include: Temperament,
    });
    
    return newDog;
  } catch (error) {
    throw error;
  }
}

module.exports = createDogs;
