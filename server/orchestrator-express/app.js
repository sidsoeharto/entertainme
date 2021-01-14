const express = require("express")
const app = express()
const PORT = 4000
const movieRouter = require("./routers/movies")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/movies", movieRouter)

app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})