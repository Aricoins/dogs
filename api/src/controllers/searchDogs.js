require("dotenv").config();
const axios = require('axios');
const { Dog } = require('../db');
const { Op, Sequelize } = require('sequelize');


async function searchDogs(nombre) {
  try {
    // Consultar la API externa
    const response = await axios(`https://api.thedogapi.com/v1/breeds`);
    const apiData = response.data;
   

    const APIdogs = apiData.filter((dog) => {
      // Filtramos los resultados de la API para que devuelva todos los dogs que coincidan parcialmente con la búsqueda
      return dog.name.toLowerCase().includes(nombre.toLowerCase());
    });

    // Consultar en la base de datos local
    const dbDogs = await Dog.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${nombre}%`, // Búsqueda insensible a mayúsculas y minúsculas
        },
      },
    });

    // Combina los datos de la API y la base de datos
    const dogs = [...APIdogs, ...dbDogs];

    // Mapea los datos para que queden en el formato que queremos
    const dogis = dogs.map((dogData) => ({
      id: dogData.id,
      nombre: dogData.name,
      imagen: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id }.jpg`, // Asumo que esta es la propiedad para la imagen
      altura: `${dogData.height.metric} cm`, // Mostramos la altura en centímetros
      peso: `${dogData.weight.metric} kg`, // Mostramos el peso en kilogramos
      anios: dogData.life_span,
      temperament: dogData.temperament,
    }));

    // Devuelve los datos mapeados
    return dogis;
  } catch (error) {
    console.error('Error en la búsqueda de razas:', error);
    throw new Error('Error en la búsqueda de razas');
  }
}

module.exports = searchDogs;
