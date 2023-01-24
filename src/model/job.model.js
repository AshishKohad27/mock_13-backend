const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
    companyName: String,
    position: String,
    contract: String,
    location: String,
});

const jobModel = model("job", jobSchema);

module.exports = jobModel;