const getDetail = require("../controllers/getDetail");


const getHandleDetail = async (req, res) => {
    const idDog= req.params.idDog;
    try {
      const dogDetail = await getDetail(idDog);
       res.status(200).json(dogDetail);
       if (!dogDetail) {
         res.status(404).json({ error: 
          'Dog no encontrado.' });
      }
    } catch (error) {
       res.status(500).json({ error: 
        'Error al obtener el detalle del dog.' });
    } }
module.exports = getHandleDetail