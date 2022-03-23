const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    time: String,
    name: String,
});

module.exports = mongoose.model("user", userSchema);