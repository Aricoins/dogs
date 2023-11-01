require('dotenv').config()

const axios = require("axios")
const{Dog } = require("../db")

async function getDetail(idDog) {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idDog}?api_key={API_KEY}`);
    const dogData = response.data;

    const detail = {
      id: dogData.id,
      nombre: dogData.name,
      imagen: dogData.reference_image_id, // Asumo que esta es la propiedad para la imagen
      altura: dogData.height ? `${dogData.height.metric} cm` : 'Altura no disponible',
      peso: dogData.weight ? `${dogData.weight.metric} kg` : 'Peso no disponible',
        anios: dogData.life_span,
      temperament: dogData.temperament,
    }

    console.log(detail);

    const dogDB = await Dog.findByPk(idDog);

    return [detail, dogDB];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = getDetail;
