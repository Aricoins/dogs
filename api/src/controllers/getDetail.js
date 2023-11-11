const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const { Dog, Temperament} = require("../db");
const { API_KEY } = process.env;

async function getDetail(idDog) {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idDog}?api_key=${API_KEY}`);
    const dogData = response.data;


    const detail = dogData

    const detailInfo = {
      id: detail.id,
      nombre: detail.name,
      imagen: `https://cdn2.thedogapi.com/images/${detail.reference_image_id}.jpg`,
      altura: detail.height ? `${detail.height.metric} cm` : 'Altura no disponible',
      peso: detail.weight ? `${detail.weight.metric} kg` : 'Peso no disponible',
      anios: detail.life_span,
      temperament: detail.temperament,
    };

    console.log(detailInfo);

    return detailInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = getDetail;
