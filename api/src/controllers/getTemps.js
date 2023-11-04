const axios = require("axios");
//const { Temperament } = require("../db");
const {Temperament, Dog} = require("../db");

// Función para obtener las razas de perros de la API.
async function getTemps() {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const dogs = response.data;


    for (const dog of dogs) {
      if (dog.temperament) { // Verifica si 'temperament' está definido y no es null
        const tempsList = dog.temperament.split(",").map((temp) => temp.trim());

        for (const tempName of tempsList) {
          // Verifica si el temp ya existe en la base de datos.
          const existingTemp = await Dog.findOne({ where: { temperament: tempName } });
    if (!existingTemp) {
      // Si no existe, créalo.
      await Temperament.create({ name: tempName });
      console.log(`Temperamento "${tempName}" creado en la base de datos.`);
    } else {
      console.log(`El Tempramento "${tempName}" ya existe en la base de datos.`);
    }
     
        }
      }
    }

    const temperamento = await Temperament.findAll();
    return temperamento
  } catch (error) {
    console.error("Error al obtener los temperamentos", error);
    throw error; // Puedes lanzar el error para que sea manejado por el llamador de la función.
  }
}

module.exports = getTemps;
