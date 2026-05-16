
const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Movie must have a title"]
  },
  overview: {
    type: String,
    required: [true, "Movie must have an overview"]
  },
  release_date: Date,
  vote_count: {
    type: Number,
    default: 1.0
  },
  popularity: {
    type: Number,
    default: 4.4

  },
  genre_ids: {
    type: [String],
    required: [true, "Movie must have a genre"]
  },
  adult: {
    type: Boolean,
    default: false

  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

movieSchema.virtual("halfPopularity").get(function () {
  return this.popularity / 2

})
// Document middleware 
movieSchema.post("save", function(doc, next){
  console.log(doc)
  next()
})
movieSchema.pre("save", function (next) {
this.vote_count = 3
console.log(this)
})
//Query Middleware


const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
