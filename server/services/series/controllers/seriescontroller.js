const Series = require("../models/series")

class SeriesController {
  static findAll(req, res) {
    Series.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findOne(req, res) {
    const { id } = req.params;
    Series.findOne(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static addSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newSeries = { title, overview, poster_path, popularity, tags};
    Series.create(newSeries)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static updateSeries(req, res) {
    const {id} = req.params
    let { title, overview, poster_path, popularity, tags } = req.body
    const update = { title, overview, poster_path, popularity, tags }
    Series.update(id, update)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteSeries(req, res) {
    const { id } = req.params;
    Series.delete(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = SeriesController