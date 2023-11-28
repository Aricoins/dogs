const { Dog, Temperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios, temperament };

  console.log(dogData);

  try {
    // Create a new dog in the database
    const newDog = await Dog.create(dogData);

    // Create a new temperament in the database
    const newTemperament = await Temperament.create({ name: temperament });

    // Associate the dog with the requested temperament
    await newDog.addTemperament(newTemperament, { through: { selfGranted: false } });

    // Find the dog with the associated temperament
    const result = await Dog.findAll({
      where: { id },
      include: Temperament,
    });

    return newDog;
  } catch (error) {
    throw error; // Throw any error that occurs when invoking the function
  }
}

module.exports = createDogs;
