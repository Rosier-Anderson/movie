const AppError = require("../utils/appError");
const handleFieldsErrorDB = (error) => {
  const regex = /{([^}]*)}/;
  const value = error.errorResponse.errmsg.match(regex)[0]
  const message = `Duplicated field value:${value}, please try another value!`
  return new AppError(message, 400)
}
const handleCastErrorDB = (error) => {
  message = `Invalid value for '${error.path}': ${error.value}`;
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR ", err)
    res.status(500).json({
      status: "error",
      message: "Something went wrong!"
    })
  }

}


module.exports = (err, req, res, next) => {
  let error = { ...err }
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") error = handleCastErrorDB(error)
    if (err.code === 11000) error = handleFieldsErrorDB(error)
    // if(err.name === "ValidationError")
    // check the video in section validation error in section handle error
    sendErrorProd(error, res)
  }

};
