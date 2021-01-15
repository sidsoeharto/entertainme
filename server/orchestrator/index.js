const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');

const axios = require('axios')
const Redis = require("ioredis")
const redis = new Redis()
const moviesUrl = "http://localhost:4001/movies"
const seriesUrl = "http://localhost:4002/movies"

const typeDefs = gql`
  type Movies {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movies]
    moviesById(id: String!): Movies
    series: [Series]
    seriesById(id: String!): Series
  }

  type Mutation {
    createMovie(movies: MovieInput): Movies
    updateMovie(id: String!, updates: MovieInput): Movies
    deleteMovie(id: String!): Movies
    createSeries(series: SeriesInput): Series
    updateSeries(id: String!, updates: SeriesInput): Series
    deleteSeries(id: String!): Series
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        let cache = await redis.get("movies");
        if (cache) {
          console.log('from cache')
          return JSON.parse(cache)
        } else {
          console.log('from server')
          const movies = await axios.get("http://localhost:4001/movies")
          await redis.set("movies", JSON.stringify(movies.data))
          return movies.data
        }
      } catch (err) {
        console.log(err)
      }
    },

    moviesById: async (_, args) => {
      try {
        const id = args.id
        const movie = await axios.get(`http://localhost:4001/movies/${id}`)
        return movie.data
      } catch (err) {
        console.log(err)
      }
    },

    series: async () => {
      try {
        const cache = await redis.get("series")
        console.log(cache)
        if (cache) {
          console.log('from cache')
          return JSON.parse(cache)
        } else {
          console.log('from server')
          const series = await axios.get("http://localhost:4002/series")
          await redis.set("series", JSON.stringify(series.data))
          return series.data
        }
      } catch (err) {
        console.log(err)
      }
    },

    seriesById: async (_, args) => {
      try {
        const id = args.id
        const series = await axios.get(`http://localhost:4002/series/${id}`)
        return series.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});