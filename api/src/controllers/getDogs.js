
require("dotenv").config()

const axios = require("axios")
const {Dog} = require("../db")
const {Op} = require("sequelize")
const {API_KEY} = process.env	


const getDogs = async () => {
  try {

let response = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  .then(data=>data)
  const apiDogs = response.data;


  const dogs = apiDogs.map((dogData) => ({
    id: dogData.id,
      nombre: dogData.name,
      imagen: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`, // Asumo que esta es la propiedad para la imagen
      altura: `${dogData.height.metric} cm`, // Mostramos la altura en centímetros
      peso: `${dogData.weight.metric} kg`, // Mostramos el peso en kilogramos
      anios: dogData.life_span,
      temperament: dogData.temperament,
  }));

const dbdogs = await Dog.findAll({
  include: [{
    model: Temperament,
    attributes: ['name'],
    through: { attributes: [] }
  }]
});

// Mapear perros de BD al mismo formato que la API
const formattedDbDogs = dbdogs.map(dog => ({
  id: dog.id,
  nombre: dog.nombre,
  imagen: dog.imagen,
  altura: `${dog.altura} cm`,
  peso: `${dog.peso} kg`, 
  anios: `${dog.anios} years`, // Formato consistente con la API
  temperament: dog.Temperaments 
    ? dog.Temperaments.map(temp => temp.name).join(', ')
    : ''
}));

      // Si se encontrarondogs  en la base de datos, responde con esos datos
     return [...dogs, ...formattedDbDogs];
    
  } catch (error) {
    console.error('Error obteniendo perros:', error);
    throw error; // Re-lanzar el error para que sea manejado por el handler
   }
}

module.exports = getDogs;
