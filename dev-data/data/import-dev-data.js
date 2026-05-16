const fs = require("fs")

const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const Movie = require("../../models/movieModel");
const mongoose = require("mongoose");

const DB_URI = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(" DB connection successful");
  })
  .catch((err) => {
    console.log(`DB connection error: ${err.message}`);
  });
const rawData = JSON.parse(fs.readFileSync(`${__dirname}/movie-simple.json`,"utf-8"))
//add try catch later 
const seedDB = async () => {
  try {
    await Movie.create(rawData);
   
  } catch (error) {
    console.log(error)
  }
   process.exit()
};
const deleteDB = async () => {
  try {
    await Movie.deleteMany();
   
  } catch (error) {
    console.log(error)
  }
  
  process.exit()
}; 

if (process.argv[2] === "--import") {
  seedDB();
  console.log("DB was seed successully");
} else if (process.argv[2] === "--delete") {
  deleteDB()
   console.log("data successfuly deleted")
}
