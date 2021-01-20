const db = require("../config/mongo")
const Series = db.collection(process.env.COLLECTION_NAME || "series")
const {ObjectID} = require("mongodb")

class SeriesModel {
  static find() {
    return Series.find({}).toArray()
  }

  static findOne(id) {
    return Series.findOne({_id: ObjectID(id)})
  }

  static create(newSeries) {
    return Series.insertOne(newSeries)
  }

  static update(id, updates) {
    return Series.updateOne(
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
    return Series.deleteOne({_id: ObjectID(id)})
  }
}

module.exports = SeriesModel