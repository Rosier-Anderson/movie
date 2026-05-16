const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on PORT ${PORT}`);
});
