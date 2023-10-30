const searchDogs =require("../controllers/searchDogs")

const getHandlerSearch =  async (req, res) => {
    const {name} = req.query;

    
      try {
      const drivers = await searchDogs(name);
      
  
      if (drivers.length === 0) {
        res.status(404).json({ 
          
          message:
        'No se encontraron drivers.' });
      }
     
      res.status(200).json(drivers);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar drivers.' });
    }
  }

module.exports = getHandlerSearch