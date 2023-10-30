// controllers/searchdogs.js
const { Dogs } = require('../db');
const { Op } = require('sequelize');

async function searchDogs(name) {
  
  
  const response = await axios(`https://api.thedogapi.com/v1/breeds?name=${name}`)
    .then(data=>data)
    const apiDogs = response.data;
  
  
    const dogs = apiDrivers.map((dog) => ({
      id: dog.id,
      nombre: dog.Nombre,
       imagen: dog.Imgen,
       altura: dog.Alura,
       peso: dog.Peso, 
      anios: dog.Añosdevida, 
       temperament: dog.temperament,
       }));
  
  
  
  const dbdogs = await Dogs.findAll(


    {
      where: {
        [Op.or]: [
          {
            forename: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            surname: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      },
    }
  )
        // Si se encontraron conductores en la base de datos, responde con esos datos
       return [...dogs, ...dbDogs]
         }

    
module.exports = searchDogs
