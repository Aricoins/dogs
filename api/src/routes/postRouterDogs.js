const {Router} = require("express")
const postRouter = Router()

const postHandlerDogs = require("../handlers/postHandlerDogs");

postRouter.post("/", postHandlerDogs);

  module.exports= postRouter