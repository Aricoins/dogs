const getTemps = require("../controllers/getTemps");


const getHandlerTemps = async (req, res) => {
    try {
      const temps = await getTemps();
      res.status(200).json(temps);
    } catch (error) {
      console.error("Error detallado en getHandlerTemps:", error.message);
      console.error("Stack trace:", error.stack);
      res.status(500).json({ 
        error: "Error al obtener los temperamentos.",
        details: error.message 
      });
    }
   }

   module.exports= getHandlerTemps