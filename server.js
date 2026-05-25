const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXEPTION!: Shutting Down🔥🔥🔥🔥")
   console.log(`${error.name}🔥🔥: ${error.message}`);
})

const app = require("./app");



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

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on PORT ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`DB connection error🔥🔥: ${error.message}`);
  console.log("UNHANDLED REJECTION!: Shutting Down🔥🔥🔥🔥")
  server.close(() => {
    process.exit(1);
  })
})


