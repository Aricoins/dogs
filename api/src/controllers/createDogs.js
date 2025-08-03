const { Dog, Temperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios };
  
  try {
    // 1. Crear el perro
    const newDog = await Dog.create(dogData);
    
    // 2. Procesar temperamentos
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
      
      // 6. Asociar usando el método PLURAL
      if (existingTemperaments.length > 0) {
        // ¡CORRECCIÓN CLAVE AQUÍ!
        await newDog.addTemperaments(existingTemperaments);
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
