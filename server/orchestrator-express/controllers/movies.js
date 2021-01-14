const Redis = require('ioredis');
const redis = new Redis()
const axios = require("axios")

class MovieController {
  static async findAllMovies (req, res) {
    try {
      const cache = await redis.get("movies")
      console.log(cache)
      if (cache) {
        console.log('from cache')
        res.status(200).json(JSON.parse(cache))
      } else {
        console.log('from server')
        const movies = await axios.get("http://localhost:4001/movies")
        await redis.set("movies", JSON.stringify(movies.data))
        res.status(200).json(movies.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async findOneMovie (req, res) {
    try {
      const {id} = req.params
      const movie = await axios.get(`http://localhost:4001/movies/${id}`)
      res.status(200).json(movie.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async createMovie (req, res) {
    try {
      const newMovie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const movie = await axios.post("http://localhost:4001/movies", newMovie)
      await redis.del("movies");
      res.status(201).json(movie.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async updateMovie (req, res) {
    try {
      const {id} = req.params
      const { title, overview, poster_path, popularity, tags } = req.body
      const movie = await axios.put(`http://localhost:4001/movies/${id}`, {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      })
      await redis.del("movies")
      res.status(200).json(movie.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteMovie(req, res) {
    try {
      const { id } = req.params
      const movie = await axios.delete(`http://localhost:4001/movies/${id}`)
      await redis.del('movies')
      res.status(200).json(movie.data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MovieController