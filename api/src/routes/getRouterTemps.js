const { Router } = require("express");
const routerTeams = Router()

const getHandlerTemps = require("../handlers/getHandlerTemps")


routerTeams.get("/", getHandlerTemps)

   module.exports= routerTeams