
const Movie = require("../models/movieModel");
const ApiFeatures = require("../utils/ApiFeatures");

const getMovieByYear = async (req, res) => {

  try {
    const year = req.params.year * 1;
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
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message
    });
  }

}


const getAllmovies = async (req, res) => {
  try {
    const features = new ApiFeatures(Movie.find(), req.query).filter();
    const movie = await features.query

    res.status(200).json({
      status: "success",
      results: movie.length,
      data: movie,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message
    });
  }
};


const createMovie = async (req, res) => {
  
  try {

    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: movie,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message
    });
  }
}

const getMovieByID = async (req, res) => {
  try {
    const params = req.params.id
    const movie = await Movie.findById(params)
    res.status(200).json({
      status: "success",
      data: movie
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message
    });
  }
}

module.exports = { getMovieByYear, getAllmovies, createMovie, getMovieByID };
