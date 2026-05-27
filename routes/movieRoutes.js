const express = require("express");
const router = express.Router();
//  const catchAsync = require("../utils/catchAsync");
const { getAllmovies, createMovie, getMovieByID, getMovieByYear, deleteMovieByID, updateMovie, updateMovieByID } = require("../controllers/movieController");

router.route("/").get(getAllmovies).post(createMovie);
router.route("/release-year/:year").get(getMovieByYear)
router.route('/:id').get(getMovieByID).patch(updateMovieByID).delete(deleteMovieByID)

module.exports = router