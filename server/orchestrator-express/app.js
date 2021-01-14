const express = require("express")
const app = express()
const PORT = 4000
const movieRouter = require("./routers/movies")
const seriesRouter = require("./routers/series")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/movies", movieRouter)
app.use("/series", seriesRouter)

app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})