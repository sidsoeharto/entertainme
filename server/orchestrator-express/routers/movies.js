const router = require("express").Router()
const MovieController = require("../controllers/movies")

router.get("/", MovieController.findAllMovies)
router.get("/:id", MovieController.findOneMovie)
router.post("/", MovieController.createMovie)
router.put("/:id", MovieController.updateMovie)
router.delete("/:id", MovieController.deleteMovie)

module.exports = router