const db = require("../config/mongo")
const Movie = db.collection("movies")
const {ObjectID} = require("mongodb")

class MovieModel {
  static find() {
    return Movie.find({}).toArray()
  }

  static findOne(id) {
    return Movie.findOne({_id: ObjectID(id)})
  }

  static create(newMovie) {
    return Movie.insertOne(newMovie)
  }

  static update(id, updates) {
    return Movie.updateOne(
      {_id: ObjectID(id)},
      {
        $set: {
          title: updates.title,
          overview: updates.overview,
          poster_path: updates.poster_path,
          popularity: updates.popularity,
          tags: updates.tags
        }
      }
    )
  }

  static delete(id) {
    return Movie.deleteOne({_id: ObjectID(id)})
  }
}

module.exports = MovieModel