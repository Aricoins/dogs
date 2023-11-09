require('dotenv').config();
const axios = require("axios");
const { Dog } = require("../db");
const { API_KEY } = process.env;

// endpoint https://api.thedogapi.com/v1/breeds;

async function getDetail(idDog) {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const dogData = response.data;

    const detail = dogData.find((dog) => dog.id === idDog);
console.log(detail)
if (detail) {
  
 
const detailInfo = {
    id: detail.id.toString(),
    nombre: detail.name,
    imagen: `https://cdn2.thedogapi.com/images/${detail.reference_image_id}.jpg`,
    altura: detail.height ? `${detail.height.metric} cm` : 'Altura no disponible',
    peso: detail.weight ? `${detail.weight.metric} kg` : 'Peso no disponible',
    anios: detail.life_span,
    temperament: detail.temperament,
  };

  console.log(detailInfo);

  // Utilizar UUID para buscar en la base de datos
  const dogDB = await Dog.findByPk(idDog);

  return [detailInfo, dogDB];
} else {
  console.log(`Dog with id ${idDog} not found.`);
  return [null, null]; // or handle the case where the dog is not found
}
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = getDetail;
