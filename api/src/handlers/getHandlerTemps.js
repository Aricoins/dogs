const getTemps = require("../controllers/getTemps");


const getHandlerTemps = async (req, res) => {
    try {
      const temps = await getTemps();
      res.status(200).json(temps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los temperamentos." });
    }
   }

   module.exports= getHandlerTemps