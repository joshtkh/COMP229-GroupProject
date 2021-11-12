// require mongoose
const mongoose = require("mongoose");

const questionSchema = require("./question");
const Schema = mongoose.Schema;

// Create a schema for our surveys in MongoDB
const SurveySchema = new Schema({
    surveyName: String,
    surveyDescription: String,
    surveyQuestions: [questionSchema]
}, {
    collection: "surveys"
});

// Now we export the model for use elsewhere
const Model = mongoose.model("Survey", SurveySchema);
module.exports = Model;