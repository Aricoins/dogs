require('dotenv').config()

const axios = require("axios")
const{Dog } = require("../db")

async function getDetail(idDogs) {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idDogs}?api_key={API_KEY}`);
    const dogData = response.data;

    const detail = {
      id: dogData.id,
      nombre: dogData.name,
      imagen: dogData.reference_image_id, // Asumo que esta es la propiedad para la imagen
      altura: `${dogData.height.metric} cm`, // Mostramos la altura en centímetros
      peso: `${dogData.weight.metric} kg`, // Mostramos el peso en kilogramos
      anios: dogData.life_span,
      temperament: dogData.temperament,
    }

    console.log(detail);

    const dogDB = await Dog.findByPk(idDogs);

    return [detail, dogDB];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = getDetail;
