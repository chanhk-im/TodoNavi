var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);
