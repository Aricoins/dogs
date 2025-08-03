const { Dog, Temperament, DogTemperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios, temperament };
  console.log('Datos del perro a crear:', dogData);
  
  try {
    // Crear un nuevo perro en la base de datos
    const newDog = await Dog.create(dogData);
    console.log('Perro creado exitosamente:', newDog.id);
    
    // Procesar los temperamentos del string
    if (temperament && typeof temperament === 'string') {
      // Dividir por comas y limpiar espacios
      const temperamentNames = temperament.split(',').map(t => t.trim());
      console.log('Temperamentos a buscar:', temperamentNames);
      
      // Procesar cada temperamento
      for (const tempName of temperamentNames) {
        if (tempName) { // Validar que no esté vacío
          console.log(`Buscando temperamento: "${tempName}"`);
          
          const temperamento = await Temperament.findOne({
            where: { name: tempName },
          });
          
          if (temperamento) {
            console.log(`Temperamento encontrado: ${temperamento.name} (ID: ${temperamento.id})`);
            await newDog.addTemperament(temperamento.id);
          } else {
            console.log(`⚠️  Temperamento no encontrado: "${tempName}"`);
            // No lanzar error, solo continuar con los demás
          }
        }
      }
    }
    
    // Buscar el perro con los temperamentos asociados
    const result = await Dog.findByPk(id, {
      include: Temperament,
    });
    
    console.log('Perro creado con temperamentos:', result);
    return result; // Retornar el perro con temperamentos incluidos
    
  } catch (error) {
    console.error('Error en createDogs:', error);
    throw error;
  }
}

module.exports = createDogs;
