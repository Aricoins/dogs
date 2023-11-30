const { sequelize } = require("../db");
const { Temperament } = require("../db");
const { Sequelize } = require("sequelize");
const axios = require("axios");
const { API_KEY } = process.env;

async function getTemps() {
  const transaction = await sequelize.transaction();

  try {
    const existingTemps = await Temperament.findAll();
    const existingTempNames = existingTemps.map((temp) => temp.name);

    const response = await axios.get(`http://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`, { timeout: 5000 });
    const dogs = response.data;

    for (const dog of dogs) {
      if (dog.temperament) {
        const tempsList = dog.temperament.split(",").map((temp) => temp.trim());
        const existingTempsInAPI = tempsList.filter((tempName) => existingTempNames.includes(tempName));

        existingTempsInAPI.forEach((existingTemp) => {
          console.log(`El Temperamento "${existingTemp}" ya existe en la base de datos.`);
        });

        const newTemps = tempsList.filter((tempName) => !existingTempNames.includes(tempName.toLowerCase()));

        if (newTemps.length > 0) {
          const uniqueNewTemps = [...new Set(newTemps)];
          const nonExistingNewTemps = uniqueNewTemps.filter((tempName) => !existingTempNames.includes(tempName.toLowerCase()));

          if (nonExistingNewTemps.length > 0) {
            const createdTemps = await Temperament.bulkCreate(
              nonExistingNewTemps.map((tempName) => ({ name: tempName })),
              { transaction }
            );

            console.log(`${createdTemps.length} nuevos temperamentos creados en la base de datos.`);

            await transaction.commit();
            existingTempNames.push(...nonExistingNewTemps);
          }
        }
      }
    }

    const temperamento = await Temperament.findAll();
    console.log(temperamento);

    return temperamento;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al obtener los temperamentos", error);
    throw error;
  }
}

module.exports = getTemps;
