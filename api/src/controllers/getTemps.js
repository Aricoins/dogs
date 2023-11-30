const { sequelize } = require("../db"); // Asegúrate de que la ruta sea correcta
const { Sequelize } = require("sequelize");


const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env; // API_KEY = "b0b3b0d9-8b7a-4b9e-9b0f-5b9b6b6b6b6b";

async function getTemps() {
  // Crear una transacción para garantizar la coherencia de la base de datos
  const transaction = await sequelize.transaction();

  try {
    // Obtén todos los temperamentos existentes en la base de datos
    const existingTemps = await Temperament.findAll();
    const existingTempNames = existingTemps.map((temp) => temp.name);

    // Realiza la llamada a la API
    const response = await axios.get(`http://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`, { timeout: 5000 });
    const dogs = response.data; // Procesar solo los primeros 50 perros, por ejemplo

    // Iterar sobre los perros de la API
    for (const dog of dogs) {
      // Verificar si el perro tiene información sobre temperamento
      if (dog.temperament) {
        // Separar los temperamentos en una lista y quitar espacios en blanco
        const tempsList = dog.temperament.split(",").map((temp) => temp.trim());

        // Filtrar los temperamentos que ya existen en la base de datos
        const existingTempsInAPI = tempsList.filter((tempName) => existingTempNames.includes(tempName));

        // Mostrar mensajes para temperamentos ya existentes
        existingTempsInAPI.forEach((existingTemp) => {
          console.log(`El Temperamento "${existingTemp}" ya existe en la base de datos.`);
        });

        // Filtrar los temperamentos nuevos que aún no existen en la base de datos
        const newTemps = tempsList.filter((tempName) => !existingTempNames.includes(tempName.toLowerCase()));

        // Verificar si hay nuevos temperamentos para agregar
        if (newTemps.length > 0) {
          // Eliminar duplicados y obtener los nuevos temperamentos únicos
          const uniqueNewTemps = [...new Set(newTemps)];

          // Filtrar los temperamentos nuevos que aún no existen en la base de datos (segunda verificación)
          const nonExistingNewTemps = uniqueNewTemps.filter((tempName) => !existingTempNames.includes(tempName.toLowerCase()));

          // Verificar si hay temperamentos nuevos no existentes
          if (nonExistingNewTemps.length > 0) {
            // Crear nuevos temperamentos en la base de datos dentro de la transacción
            const createdTemps = await Temperament.bulkCreate(
              nonExistingNewTemps.map((tempName) => ({ name: tempName })),
              { transaction }
            );

            // Mostrar el número de nuevos temperamentos creados
            console.log(`${createdTemps.length} nuevos temperamentos creados en la base de datos.`);

            // Confirmar la transacción y actualizar la lista de temperamentos existentes
            await transaction.commit();
            existingTempNames.push(...nonExistingNewTemps);
          }
        }
      }
    }

    // Obtener todos los temperamentos después de la operación
    const temperamento = await Temperament.findAll();
    console.log(temperamento);

    // Devolver la lista completa de temperamentos
    return temperamento;
  } catch (error) {
    // En caso de error, realizar un rollback de la transacción y mostrar un mensaje de error
    await transaction.rollback();
    console.error("Error al obtener los temperamentos", error);

    // Relanzar el error para manejarlo en el nivel superior
    throw error;
  }
}

// Exportar la función para su uso en otros módulos
module.exports = getTemps;
