
const { default: mongoose } = require("mongoose");
const Movie = require("../models/movieModel");
const ApiFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getMovieByYear = catchAsync(async (req, res, next) => {
  const year = req.id.year * 1;
  const movie = await Movie.aggregate([
    {
      $unwind: "$genre_ids"
    },
    {
      $match: {
        "release_date": {
          $gt: new Date(`${year}-01-01`),
          $lt: new Date(`${year}-12-30`),
        }
      }

    },
    {
      $group: {
        "_id": null,
        "avgVoteCount": { $avg: "$vote_count" },
        "movieTitle": { $push: "$title" }

      }
    }

  ])

  res.status(200).json({
    status: "success",
    results: movie.length,
    data: movie
  });
})



const getAllmovies = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Movie.find(), req.query).filter();
  const movie = await features.query

  res.status(200).json({
    status: "success",
    results: movie.length,
    data: movie,
  });

})


const createMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({
    status: "success",
    data: movie,
  });

})

const getMovieByID = catchAsync(async (req, res, next) => {
  const id = req.params.id

  const movie = await Movie.findById(id)

  if (!movie) return next(new AppError("No movie found with that ID", 404))

  res.status(200).json({
    status: "success",
    data: movie
  });

})

const deleteMovieByID = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    console.log("movie")
    return next(new AppError("No movie found with that ID", 404))
  }
  res.status(200).json({
    status: "success",
    data: movie
  });

})

const updateMovieByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  // console.log(req)
  const movie = await Movie.findByIdAndUpdate(id, req.body, { returnDocument: "after", runValidators: true })

  res.status(200).json({
    status: "success",
    data: movie
  });

})

module.exports = { getMovieByYear, getAllmovies, createMovie, updateMovieByID, getMovieByID, deleteMovieByID };
