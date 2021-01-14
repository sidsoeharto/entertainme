const Movie = require("../models/movies")

class MovieController {
  static findAll(req, res) {
    Movie.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findOne(req, res) {
    const { id } = req.params;
    Movie.findOne(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newMovie = { title, overview, poster_path, popularity, tags};
    Movie.create(newMovie)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static updateMovie(req, res) {
    const {id} = req.params
    let { title, overview, poster_path, popularity, tags } = req.body
    const update = { title, overview, poster_path, popularity, tags }
    Movie.update(id, update)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteMovie(req, res) {
    const { id } = req.params;
    Movie.delete(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = MovieController