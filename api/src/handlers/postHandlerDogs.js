const createDogs = require("../controllers/createDogs")

const postHandlerDogs = (req, res)=>{
//Obtener info por body

const { ID, Imagen,  Nombre, Altura,  Peso, Añosdevida} = req.body

try {
    const newDog = createDogs( ID, Imagen,  Nombre, Altura,  Peso, Añosdevida )
    res.status(200).json( `${Nombre} se ha creado con éxito!`)
} catch (error) {
    res.status(400).json ({error: error.message})
}
} 
module.exports = postHandlerDogs