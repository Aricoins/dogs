const axios = require("axios");
//const { Temperament } = require("../db");
const {Temperament, Dogs} = require("../db");

// Función para obtener las razas de perros de la API.
async function getTemps() {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds?api_key={API_KEY}");
    const dogs = response.data;

    for (const dog of dogs) {
      if (dog.temperament) { // Verifica si 'temperament' está definido y no es null
        const tempsList = dog.temperament.split(",").map((temp) => temp.trim());

        for (const tempName of tempsList) {
          // Verifica si el equipo ya existe en la base de datos.
          const existingTemp = await Dogs.findOne({ where: { temperament: tempName } });

          if (!existingTemp) {
            // Si no existe, créalo.
            await Temperament.create({ temperament: tempName });
            console.log(`Equipo "${tempName}" creado en la base de datos.`);
          } else {
            console.log(`Equipo "${tempName}" ya existe en la base de datos.`);
          }
        }
      }
    }

    const temperamento = await Temperament.findAll();
console.log(temperamento);
  } catch (error) {
    console.error("Error al obtener los temperamentos", error);
    throw error; // Puedes lanzar el error para que sea manejado por el llamador de la función.
  }
}

module.exports = getTemps;
