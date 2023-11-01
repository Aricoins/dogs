
require("dotenv").config()

const axios = require("axios")
const {Dog} = require("../db")
const {Op} = require("sequelize")


const getDogs = async () => {
  try {

const response = await axios(`https://api.thedogapi.com/v1/breeds?api_key={API_KEY}`)
  .then(data=>data)
  const apiDogs = response.data;


  const dogs = apiDogs.map((dogData) => ({
    id: dogData.id,
      nombre: dogData.name,
      imagen: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id }_1280.jpg`, // Asumo que esta es la propiedad para la imagen
      altura: `${dogData.height.metric} cm`, // Mostramos la altura en centímetros
      peso: `${dogData.weight.metric} kg`, // Mostramos el peso en kilogramos
      anios: dogData.life_span,
      temperament: dogData.temperament,
  }));

const dbdogs = await Dog.findAll({
 
  
});
      // Si se encontrarondogs  en la base de datos, responde con esos datos
     return [...dogs, ...dbdogs];
    
  } catch (error) {
    console.log(error)
   }
}

module.exports = getDogs;
