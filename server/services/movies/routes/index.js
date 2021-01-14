const router = require("express").Router()
const MovieController = require("../controllers/moviescontroller")

router.get('/movies', MovieController.findAll)
router.get('/movies/:id', MovieController.findOne)
router.post('/movies', MovieController.addMovie)
router.put('/movies/:id', MovieController.updateMovie)
router.delete('/movies/:id', MovieController.deleteMovie)

module.exports = router