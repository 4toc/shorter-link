const knex = require("../db")
const shortid = require("shortid")

exports.linksAll = async (req, res) => {
  knex
    .select("*") // select all records
    .from("links") // from 'books' table
    .then((userData) => {
      res.json(userData)
    })
    .catch((err) => {
      res
        .status(403)
        .json({ message: `There was an error retrieving books: ${err}` })
    })
}

exports.linksCreate = async (req, res) => {
  const baseURL = "http://localhost:5000"
  const code = shortid.generate()

  const existing = await knex("links")
    .where("full_link", req.body.fullLink)
    .first()
    .then((row) => row)
  const shortLink = baseURL + "/t/" + code

  if (existing) {
    res.status(200).json({ link: baseURL + "/t/" + existing.short_link })
  } else {
    knex("links")
      .insert({
        full_link: req.body.fullLink,
        short_link: code,
        visits: 0,
      })
      .then(() => {
        res.status(200).json({ link: shortLink })
      })
      .catch((err) => {
        res.status(500).json({
          message: "Ошибка",
        })
      })
  }
}

exports.linksDelete = async (req, res) => {
  knex("links")
    .where("id", req.body.id)
    .del()
    .then(() => {
      res.json({ message: `Link ${req.body.id} deleted.` })
    })
    .catch((err) => {
      res.status(403).json({
        message: `There was an error deleting ${req.body.id} link: ${err}`,
      })
    })
}

exports.linksReset = async (req, res) => {
  knex
    .select("*")
    .from("links")
    .truncate()
    .then(() => {
      res.json({ message: "Links list cleared." })
    })
    .catch((err) => {
      res
        .status(403)
        .json({ message: `There was an error resetting link list: ${err}.` })
    })
}
