const axios = require("axios");
const { Temperament } = require("../db");
const {API_KEY} = process.env	// API_KEY = "b0b3b0d9-8b7a-4b9e-9b0f-5b9b6b6b6b6b";

async function getTemps() {
  try {
    // Obtén todos los temperamentos existentes en la base de datos
    const existingTemps = await Temperament.findAll();
    const existingTempNames = existingTemps.map((temp) => temp.name);

    // Realiza la llamada a la API
    const response = await axios.get(`http://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`, { timeout: 5000 });
    const dogs = response.data; // Process only the first 50 dogs for example

    for (const dog of dogs) {
      if (dog.temperament) {
        // Verifica si 'temperament' está definido y no es null
        const tempsList = dog.temperament.split(",").map((temp) => temp.trim());

        // Filtra los temperamentos que ya existen en la base de datos
        const existingTempsInAPI = tempsList.filter((tempName) => existingTempNames.includes(tempName));

        // Log los temperamentos existentes en la base de datos
        existingTempsInAPI.forEach((existingTemp) => {
          console.log(`El Temperamento "${existingTemp}" ya existe en la base de datos.`);
        });

        // Filtra los temperamentos que aún no existen en la base de datos
    const newTemps = tempsList.filter((tempName) => !existingTempNames.includes(tempName.toLowerCase()));


        if (newTemps.length > 0) {
          // Crea nuevos temperamentos en la base de datos
          const createdTemps = await Temperament.bulkCreate(newTemps.map((tempName) => ({ name: tempName })));

          console.log(`${createdTemps.length} nuevos temperamentos creados en la base de datos.`);
        }
      
      }
    
    }
    const temperamento = await Temperament.findAll();
    console.log(temperamento)
    return temperamento;
   
  } catch (error) {
    console.error("Error al obtener los temperamentos", error);
    throw error;
  }
}

module.exports = getTemps;
