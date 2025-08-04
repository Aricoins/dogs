const path = require('path');
const envPath = path.join(__dirname, '../../.env');

require('dotenv').config({ path: envPath });
const { Sequelize } = require('sequelize');
const fs = require('fs');

if (!process.env.DB_URL) {
  console.error('❌ DB_URL no está definida en las variables de entorno');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: true // Seguro en producción
    } : {
      require: true,
      rejectUnauthorized: false // Flexible en desarrollo
    }
  },
  logging: process.env.NODE_ENV === 'production' ? false : console.log
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Cargar modelos
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inyectar conexión a modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizar nombres de modelos
const models = Object.entries(sequelize.models).reduce((acc, [name, model]) => {
  acc[name[0].toUpperCase() + name.slice(1)] = model;
  return acc;
}, {});

// 1. DEFINIR RELACIONES ANTES DE EXPORTAR
const { Dog, Temperament } = models;

if (Dog && Temperament) {
  Dog.belongsToMany(Temperament, { 
    through: 'DogTemperament',
    timestamps: false
  });
  
  Temperament.belongsToMany(Dog, { 
    through: 'DogTemperament',
    timestamps: false
  });
  
  console.log('✅ Relaciones definidas correctamente');
} else {
  console.error('❌ No se pudieron definir relaciones: modelos no encontrados');
}

// 2. SINCRONIZAR CON LA BASE DE DATOS
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Base de datos sincronizada');
  } catch (error) {
    console.error('❌ Error sincronizando base de datos:', error);
  }
})();

module.exports = {
  ...models,
  conn: sequelize,
  Dog, // Exportar explícitamente para fácil acceso
  Temperament
};
