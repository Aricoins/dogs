const createDogs = require("../controllers/createDogs")

const postHandlerDogs = async (req, res)=>{
//Obtener info por body

const {  nombre, imagen, altura,  peso, anios, temperament} = req.body

try {
    const newDog = await createDogs( nombre, imagen, altura,  peso, anios, temperament )
    res.status(200).json( `${nombre} se ha creado con éxito!`)
} catch (error) {
    res.status(400).json ({error: error.message})
}
} 
module.exports = postHandlerDogs