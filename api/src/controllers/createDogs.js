
const { Dog, DogsTemperament } = require('../db'); 
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura,  peso, anios, temperament) {
  const id = uuidv4();
const  dogData = { id, nombre, imagen, altura,  peso, anios, temperament}
console.log(dogData)


  try {
    // Crea el nuevo dog en la base de datos
    const newDog = await Dog.create(dogData);

    // Asocia el dog con los temperamentos solicitados (dogData.temps)
    return newDog;
  } catch (error) {
    throw error; // Lanza cualquier error que ocurra al invocar la función
  }
}

module.exports = createDogs;
