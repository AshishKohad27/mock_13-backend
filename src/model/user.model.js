const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

const userModel = model("user", userSchema);

module.exports = userModel;
