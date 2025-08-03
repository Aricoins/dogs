const { Dog, Temperament, DogTemperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios };
  console.log(dogData);
  
  try {
    // Crear un nuevo perro en la base de datos
    const newDog = await Dog.create(dogData);
    
    // Manejar múltiples temperamentos
    if (Array.isArray(temperament)) {
      // Si es un array, procesar cada temperamento
      for (const tempName of temperament) {
        const temperamento = await Temperament.findOne({
          where: { name: tempName },
        });
        if (temperamento) {
          await newDog.addTemperament(temperamento.id);
        }
      }
    } else {
      // Si es un string, procesar un solo temperamento
      const temperamento = await Temperament.findOne({
        where: { name: temperament },
      });
      if (temperamento) {
        await newDog.addTemperament(temperamento.id);
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
