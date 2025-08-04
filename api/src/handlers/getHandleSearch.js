const searchDogs = require("../controllers/searchDogs")

const getHandlerSearch = async (req, res) => {
    const { nombre } = req.query;
    
    // Validar entrada
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ 
        error: 'Parámetro nombre es requerido y debe ser texto' 
      });
    }
    
    // Sanitizar entrada
    const nombreSanitizado = nombre.trim();
    
    if (nombreSanitizado.length < 1 || nombreSanitizado.length > 50) {
      return res.status(400).json({ 
        error: 'Nombre debe tener entre 1 y 50 caracteres' 
      });
    }
    
    try {
      const dogs = await searchDogs(nombreSanitizado);
      
      if (dogs.length === 0) {
        return res.status(404).json({ 
          message: `No se encontraron perros con el nombre "${nombreSanitizado}"`
        });
      }
     
      res.status(200).json(dogs);
    } catch (error) {
      console.error('🚨 Error en búsqueda:', error.message);
      res.status(500).json({ error: 'Error interno al buscar perros' });
    }
}

module.exports = getHandlerSearch