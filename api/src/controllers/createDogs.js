
const { Dog, Temperament, DogTemperament } = require('../db');
const { v4: uuidv4 } = require('uuid');

// Función temporal para debugging
async function listAllTemperaments() {
  try {
    const temperaments = await Temperament.findAll();
    console.log('=== TEMPERAMENTOS DISPONIBLES ===');
    temperaments.forEach(t => {
      console.log(`ID: ${t.id}, Nombre: "${t.name}"`);
    });
    console.log('=== FIN LISTA ===');
    return temperaments;
  } catch (error) {
    console.error('Error listando temperamentos:', error);
  }
}


async function createDogs(nombre, imagen, altura, peso, anios, temperament) {
  const id = uuidv4();
  const dogData = { id, nombre, imagen, altura, peso, anios, temperament };
 await listAllTemperaments();
   
  try {
    // Crear un nuevo perro en la base de datos
    const newDog = await Dog.create(dogData);
    
    // Procesar temperamentos solo si existen
    if (temperament && typeof temperament === 'string') {
      const temperamentNames = temperament.split(',').map(t => t.trim());
      
      for (const tempName of temperamentNames) {
        if (tempName) { // Verificar que no esté vacío
          try {
            const temperamento = await Temperament.findOne({
              where: { name: tempName },
            });
            
            // ✅ VERIFICACIÓN SEGURA ANTES DE ACCEDER A .id
            if (temperamento && temperamento.id) {
              await newDog.addTemperament(temperamento.id);
              console.log(`✅ Temperamento "${tempName}" añadido correctamente`);
            } else {
              console.warn(`⚠️ Temperamento "${tempName}" no encontrado en la base de datos`);
            }
          } catch (tempError) {
            console.error(`❌ Error procesando temperamento "${tempName}":`, tempError);
            // Continuar con el siguiente temperamento
          }
        }
      }
    }
    
    return newDog;
    
  } catch (error) {
    console.error('Error creando perro:', error);
    throw error;
  }
}

module.exports = createDogs;
