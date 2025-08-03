const { Dog, Temperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios };
  
  try {
    // 1. Crear el perro sin temperamentos primero
    const newDog = await Dog.create(dogData);
    
    // 2. Procesar temperamentos solo si existen
    if (temperament && typeof temperament === 'string') {
      const temperamentNames = temperament.split(',')
        .map(t => t.trim())
        .filter(t => t !== '');

      // 3. Normalizar nombres (primera letra mayúscula)
      const normalizedNames = temperamentNames.map(name => 
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      );

      // 4. Buscar temperamentos existentes
      const existingTemperaments = await Temperament.findAll({
        where: { name: normalizedNames }
      });

      // 5. Logs para depuración
      console.log('=== VALIDACIÓN DE TEMPERAMENTOS ===');
      console.log('Solicitados:', normalizedNames);
      console.log('Encontrados:', existingTemperaments.map(t => t.name));
      
      const foundNames = existingTemperaments.map(t => t.name);
      const missingTemperaments = normalizedNames.filter(name => 
        !foundNames.includes(name)
      );
      
      if (missingTemperaments.length > 0) {
        console.warn('⚠️ Temperamentos no encontrados:', missingTemperaments);
      }

      // 6. Asociar solo temperamentos existentes
      if (existingTemperaments.length > 0) {
        await newDog.addTemperaments(existingTemperaments); // ¡Importante! Pasar objetos completos
        console.log('✅ Temperamentos asociados correctamente');
      }
    }
    
    return newDog;
    
  } catch (error) {
    console.error('❌ Error creando perro:', error);
    throw error;
  }
}

module.exports = createDogs;
