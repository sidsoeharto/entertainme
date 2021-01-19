module.exports = {
  apps: [
    {
       name: 'client',
       script: 'cd client && npm install && npm start',
    },
    {
      name: 'orchestrator',
      script: 'cd server/orchestrator && npm install && nodemon index.js',
      env: {
        PORT: 4000
      },
    },
    {
      name: 'movies',
      script: 'cd server/services/movies && npm install && nodemon app.js',
      env: {
        DATABASE_NAME: "entertainme-movies-db",
        COLLECTION_NAME: "movies",
        PORT: 4001
      },
    },
    {
      name: 'series',
      script: 'cd server/services/series && npm install && nodemon app.js',
      env: {
        DATABASE_NAME: "entertainme-series-db",
        COLLECTION_NAME: "series",
        PORT: 4002
      },
    },
  ],
};