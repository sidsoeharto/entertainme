const Redis = require('ioredis');
const redis = new Redis()
const axios = require("axios")

class SeriesController {
  static async findAllSeries (req, res) {
    try {
      const cache = await redis.get("series")
      console.log(cache)
      if (cache) {
        console.log('from cache')
        res.status(200).json(JSON.parse(cache))
      } else {
        console.log('from server')
        const series = await axios.get("http://localhost:4002/series")
        await redis.set("series", JSON.stringify(series.data))
        res.status(200).json(series.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async findOneSeries (req, res) {
    try {
      const {id} = req.params
      const series = await axios.get(`http://localhost:4002/series/${id}`)
      res.status(200).json(series.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async createSeries (req, res) {
    try {
      const newSeries = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const series = await axios.post("http://localhost:4002/series", newSeries)
      await redis.del("series");
      res.status(201).json(series.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async updateSeries (req, res) {
    try {
      const {id} = req.params
      const { title, overview, poster_path, popularity, tags } = req.body
      const series = await axios.put(`http://localhost:4002/series/${id}`, {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      })
      await redis.del("series")
      res.status(200).json(series.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteSeries(req, res) {
    try {
      const { id } = req.params
      const series = await axios.delete(`http://localhost:4002/series/${id}`)
      await redis.del('series')
      res.status(200).json(series.data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = SeriesController