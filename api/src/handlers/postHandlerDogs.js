const createDogs = require("../controllers/createDogs")

const postHandlerDogs = async (req, res)=>{
//Obtener info por body

const { nombre, imagen, altura,  peso, anios, temperament} = req.body

console.log('📨 Datos recibidos en POST:', req.body);

try {
    const newDog = await createDogs( nombre, imagen, altura,  peso, anios, temperament )
    console.log('🎉 Perro creado exitosamente:', newDog.nombre);
    res.status(200).json( `${nombre} se ha creado con éxito!`)
    } catch (error) {
    console.error('🚨 Error en postHandlerDogs:', error.message);
    res.status(400).json ({error: error.message})
}
} 
module.exports = postHandlerDogs