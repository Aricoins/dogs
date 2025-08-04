const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
const { Sequelize } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log // Agrega logging para depuración
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
