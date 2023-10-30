
const { Dog, DogsTemperament } = require('../db'); 


async function createDogs( Imagen,  Nombre, Altura,  Peso, Añosdevida) {

  const ID = Math.random(123233);

const  dogData = {ID, Imagen,  Nombre, Altura,  Peso, Añosdevida}
  
  try {
    // Crea el nuevo driver en la base de datos
    const newDog = await Dog.create(dogData);

    // Asocia el driver con los equipos solicitados (driverData.teams)
    if (dogData.temperament && driverData.temperament.length > 0) {
      await newDog.addTemps(dogData.temperament, { through: DogsTemperament });
    }

    return newDriver;
  } catch (error) {
    throw error; // Lanza cualquier error que ocurra al invocar la función
  }
}

module.exports = createDogs;
