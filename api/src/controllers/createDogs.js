const { Dog, Temperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  // Generar un ID único para el perro utilizando uuidv4
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios, temperament };

  console.log(dogData); // Imprimir los datos del perro en la consola

  try {
    // Crear un nuevo perro en la base de datos
    const newDog = await Dog.create(dogData);

    // // Si no existe, crear un nuevo temperamento en la base de datos

    // const newTemperament = await Temperament.create({ name: temperament });

    // Asociar el perro con el temperamento solicitado /autoconcedido
    await newDog.addTemperament(temperament, { through: { selfGranted: false } });

 
    return newDog;
  } catch (error) {
    throw error; // Lanzar cualquier error que ocurra al invocar la función
  }
}

module.exports = createDogs;
