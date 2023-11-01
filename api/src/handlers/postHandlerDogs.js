const createDogs = require("../controllers/createDogs")

const postHandlerDogs = (req, res)=>{
//Obtener info por body

const {  nombre, imagen, altura,  peso, anios} = req.body

try {
    const newDog = createDogs(nombre, imagen, altura,  peso, anios )
    res.status(200).json( `${nombre} se ha creado con éxito!`)
} catch (error) {
    res.status(400).json ({error: error.message})
}
} 
module.exports = postHandlerDogs