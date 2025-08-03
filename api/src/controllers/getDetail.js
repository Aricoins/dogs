const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

async function getDetail(idDog) {
  try {
    if (idDog.length < 5) {
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idDog}?api_key=${API_KEY}`);
      const dogData = response.data;

      const detailInfo = {
        id: dogData.id,
        nombre: dogData.name,
        imagen: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`,
        altura: dogData.height ? `${dogData.height.metric} cm` : 'Altura no disponible',
        peso: dogData.weight ? `${dogData.weight.metric} kg` : 'Peso no disponible',
        anios: dogData.life_span,
        temperament: dogData.temperament,
      };

      console.log(detailInfo);
      return detailInfo;
    } else {
      const dog = await Dog.findByPk(idDog, {
        include: [{
          model: Temperament,
          attributes: ['name'],
          through: { attributes: [] } // Excluir datos de la tabla intermedia
        }]
      });

      if (!dog) {
        throw new Error("No se encontró el perro");
      }

      // Extraer temperamentos como string separado por comas
      const temperamentNames = dog.Temperaments 
        ? dog.Temperaments.map(temp => temp.name).join(', ')
        : '';

      const detailInfo = {
        id: dog.id,
        nombre: dog.nombre,
        imagen: dog.imagen,
        altura: `${dog.altura} cm`, 
        peso:`${dog.peso} kg`, 
        anios: dog.anios,
        temperament: temperamentNames,
      };

      console.log(detailInfo);
      return detailInfo;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = getDetail;
