
const { Dog, DogsTemperament } = require('../db'); 


async function createDogs(nombre, imagen, altura,  peso, anios) {

const  dogData = {  nombre, imagen, altura,  peso, anios}
  
  try {
    // Crea el nuevo dog en la base de datos
    const newDog = await Dog.create(dogData);

    // Asocia el dog con los temperamentos solicitados (dogData.temps)
    if (dogData.temperament && dogData.temperament.length > 0) {
      await newDog.addTemps(dogData.temperament, { through: DogsTemperament });
    }
console.log(newDog)
    return newDog;
  } catch (error) {
    throw error; // Lanza cualquier error que ocurra al invocar la función
  }
}

module.exports = createDogs;
