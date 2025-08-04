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

      // 3. Mantener nombres exactos como vienen de la API (sin normalizar case)
      const normalizedNames = temperamentNames.map(name => name.trim());
      
      console.log('Temperamentos originales recibidos:', temperamentNames);
      console.log('Temperamentos después de trim:', normalizedNames);

      // 4. Buscar temperamentos existentes usando búsqueda individual
      const { Op } = require('sequelize');
      const existingTemperaments = [];
      
      for (const tempName of normalizedNames) {
        try {
          // Buscar cada temperamento individualmente
          const found = await Temperament.findOne({
            where: { 
              [Op.or]: [
                { name: tempName }, // Búsqueda exacta
                { name: { [Op.iLike]: tempName } } // Búsqueda case-insensitive
              ]
            }
          });
          
          if (found) {
            existingTemperaments.push(found);
            console.log(`✅ Encontrado: ${tempName} -> ${found.name} (ID: ${found.id})`);
          } else {
            console.log(`❌ No encontrado: ${tempName}`);
          }
        } catch (searchError) {
          console.error(`Error buscando temperamento "${tempName}":`, searchError.message);
        }
      }

      // 5. Logs para depuración
      console.log('=== VALIDACIÓN DE TEMPERAMENTOS ===');
      console.log('Solicitados:', normalizedNames);
      console.log('Temperamentos raw encontrados:', existingTemperaments);
      console.log('Encontrados válidos:', existingTemperaments.filter(t => t && t.name).map(t => t.name));
      
      // 6. Filtrar temperamentos válidos con verificación estricta
      const validTemperaments = existingTemperaments.filter(t => {
        if (!t) {
          console.log('⚠️ Temperamento null encontrado');
          return false;
        }
        if (!t.id) {
          console.log('⚠️ Temperamento sin ID encontrado:', t);
          return false;
        }
        if (typeof t.id !== 'number' && typeof t.id !== 'string') {
          console.log('⚠️ Temperamento con ID inválido:', t.id, typeof t.id);
          return false;
        }
        return true;
      });
      
      console.log(`Temperamentos válidos para asociar: ${validTemperaments.length}/${existingTemperaments.length}`);
      
      if (validTemperaments.length > 0) {
        try {
          await newDog.addTemperaments(validTemperaments);
          console.log('✅ Temperamentos asociados correctamente:', validTemperaments.map(t => `${t.name}(${t.id})`));
        } catch (associationError) {
          console.error('❌ Error asociando temperamentos:', associationError.message);
          // No lanzar error, continuar sin temperamentos
        }
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
