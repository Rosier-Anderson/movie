const express = require("express");
const router = express.Router();
const { getAllmovies, createMovie, getMovieByID, getMovieByYear } = require("../controllers/movieController");

router.route("/").get(getAllmovies).post(createMovie);
router.route("/release-year/:year").get(getMovieByYear)
router.route('/:id').get(getMovieByID)

module.exports = router