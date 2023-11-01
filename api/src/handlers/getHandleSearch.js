const searchDogs =require("../controllers/searchDogs")

const getHandlerSearch =  async (req, res) => {
    const {nombre} = req.query;

    
      try {
      const dogs = await searchDogs(nombre);
      
  
      if (dogs.length === 0) {
   return     res.status(404).json({ 
          
          message:
        'No se encontraron dogs.' });
      }
     
      res.status(200).json(dogs);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar dogs.' });
    }
  }

module.exports = getHandlerSearch