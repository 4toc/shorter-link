const express = require("express")

const linksRoutes = require("../controllers/links-controller.js")

const router = express.Router()

router.get("/all", linksRoutes.linksAll)
router.post("/create", linksRoutes.linksCreate)
router.put("/delete", linksRoutes.linksDelete)
router.put("/reset", linksRoutes.linksReset)

module.exports = router
