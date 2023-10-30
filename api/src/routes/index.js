const { Router } = require("express");
const router = Router();

const routerTemps = require("./getRouterTemps");
const getRouter = require("./getRouterDogs")
const postRouterDogs = require("./postRouterDogs")

router.use("/dogs", getRouter)
router.use("/post", postRouterDogs)
router.use ("/temps", routerTemps)

module.exports = router;