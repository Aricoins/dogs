const axios = require("axios");
const { Temperament } = require("../db");

async function getTemps() {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const dogs = response.data;

    // Paso 1: Extraer y normalizar todos los temperamentos únicos
    const allTemperaments = new Set();
    
    dogs.forEach(dog => {
      if (dog.temperament) {
        dog.temperament.split(",")
          .map(temp => temp.trim())
          .map(temp => 
            temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase()
          )
          .forEach(temp => allTemperaments.add(temp));
      }
    });

    // Paso 2: Insertar en lote
    const temperamentArray = Array.from(allTemperaments);
    const existingTemperaments = await Temperament.findAll({
      attributes: ['name']
    });
    
    const existingNames = existingTemperaments.map(t => t.name);
    const newTemperaments = temperamentArray.filter(name => 
      !existingNames.includes(name)
    );

    if (newTemperaments.length > 0) {
      await Temperament.bulkCreate(
        newTemperaments.map(name => ({ name })),
        { ignoreDuplicates: true }
      );
      console.log(`✅ ${newTemperaments.length} nuevos temperamentos creados`);
    }

    return await Temperament.findAll({
      order: [['name', 'ASC']]
    });
    
  } catch (error) {
    console.error("❌ Error obteniendo temperamentos", error);
    throw error;
  }
}

module.exports = getTemps;
