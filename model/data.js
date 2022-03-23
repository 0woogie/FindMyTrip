const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    대분류: String,
    중분류: String,
    소분류: String,
    이름: String,
    주소: String,
    위도: String,
    경도: String,
    개요: String,
});

module.exports = mongoose.model("data", dataSchema, "data");