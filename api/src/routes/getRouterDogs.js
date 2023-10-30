const { Router } = require("express");
const getRouter = Router()
const handleGetAll = require("../handlers/getHandlerDogs");
const  getHandleDetail = require ("../handlers/getHandlerDetail")
const getHandlerSearch = require ("../handlers/getHandleSearch")

/*
- GET http://localhost:5000/drivers
  - GET http://localhost:5000/drivers?name.forename={name}
  - GET http://localhost:5000/drivers/:{id}*/

  //Todos los drivers  
getRouter.get("", handleGetAll)
     // Por nombre
getRouter.get("", getHandlerSearch );
// Por id, detalle
getRouter.get("/:idDog",  getHandleDetail);
  


  module.exports = getRouter