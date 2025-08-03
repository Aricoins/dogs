const getDogs =require("../controllers/getDogs");



const handleGetAll = async (req, res)=>{ 
    try {
      const dogFinal= await getDogs();
      res.status(200).json(dogFinal);
    } catch (error) {
      console.error('Error en handler getDogs:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor al obtener perros',
        message: error.message 
      });
   }}

      module.exports =  handleGetAll
     