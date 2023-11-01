const { Router } = require("express");
const getRouter = Router()
const handleGetAll = require("../handlers/getHandlerDogs");
const  getHandleDetail = require ("../handlers/getHandlerDetail")
const getHandlerSearch = require ("../handlers/getHandleSearch")


  //Todos los drivers  
getRouter.get("", handleGetAll)
     // Por nombre
getRouter.get("/name", getHandlerSearch );
// Por id, detalle
getRouter.get("/:idDog",  getHandleDetail);
  


  module.exports = getRouter