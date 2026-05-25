const mongoose = require("mongoose")

const userSchema = mongoose.model({
    name: {
        type: String,
        require: [true, "User must provie a name!!"],
    },
   email: {
    type: String,
    require: [true, "User must provide an email!!"]
   }
})