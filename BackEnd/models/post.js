var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    author: String,
    post: String,
    published_data: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);