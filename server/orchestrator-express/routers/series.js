const router = require("express").Router()
const SeriesController = require("../controllers/series")

router.get("/", SeriesController.findAllSeries)
router.get("/:id", SeriesController.findOneSeries)
router.post("/", SeriesController.createSeries)
router.put("/:id", SeriesController.updateSeries)
router.delete("/:id", SeriesController.deleteSeries)

module.exports = router