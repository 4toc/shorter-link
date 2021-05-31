const express = require("express")
const knex = require("../db")

const router = express.Router()

router.get("/:code", async (req, res) => {
  try {
    const existing = await knex("links")
      .where("short_link", req.params.code)
      .first()
      .then((row) => row)

    console.log("EE", existing, req.params.code)
    if (existing) {
      console.log("FFF", existing, req.params.code)

      knex("links")
        .where("short_link", req.params.code)
        .increment("visits")
        .then()
      return res.redirect(existing.full_link)
    } else {
      res.status(404).json("Ссылка не найдена")
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})

module.exports = router
