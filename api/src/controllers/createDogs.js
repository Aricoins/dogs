const { Dog, Temperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios };
  
  console.log('🐕 Creando perro con datos:', dogData);
  
  try {
    // 1. Crear el perro
    const newDog = await Dog.create(dogData);
    console.log('✅ Perro creado exitosamente con ID:', newDog.id);
    
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
      console.log('Encontrados:', existingTemperaments.filter(t => t && t.name).map(t => t.name));
      
      // 6. Filtrar temperamentos válidos y asociar
      const validTemperaments = existingTemperaments.filter(t => t && t.id);
      if (validTemperaments.length > 0) {
        await newDog.addTemperaments(validTemperaments);
        console.log('✅ Temperamentos asociados correctamente');
      } else {
        console.log('⚠️ No se encontraron temperamentos válidos para asociar');
      }
    }
    
    return newDog;
  } catch (error) {
    console.error('❌ Error creando perro:', error);
    console.error('📍 Stack trace:', error.stack);
    
    // Proporcionar más información sobre el tipo de error
    if (error.name === 'SequelizeValidationError') {
      throw new Error(`Error de validación: ${error.errors.map(e => e.message).join(', ')}`);
    } else if (error.name === 'SequelizeDatabaseError') {
      throw new Error(`Error de base de datos: ${error.message}`);
    } else {
      throw new Error(`Error interno: ${error.message}`);
    }
  }
}

module.exports = createDogs;
