const router = require("express").Router()
const SeriesController = require("../controllers/seriescontroller")

router.get('/series', SeriesController.findAll)
router.get('/series/:id', SeriesController.findOne)
router.post('/series', SeriesController.addSeries)
router.put('/series/:id', SeriesController.updateSeries)
router.delete('/series/:id', SeriesController.deleteSeries)

module.exports = router