const getDogs =require("../controllers/getDogs");



const handleGetAll = async (req, res)=>{ 
    const dogFinal= await getDogs();
    try {
      res.status(200).json(dogFinal)  
    } catch (error) {
      res.status(400).json("no hay drivers")
   }}

      module.exports =  handleGetAll
     