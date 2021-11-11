// require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create a schema for our surveys in MongoDB
const SurveySchema = new Schema({
    surveyID: Number,
    surveyName: String,
    surveyDescription: String
}, {
    collection: "surveys"
});

// Now we export the model for use elsewhere
const Model = mongoose.model("Survey", SurveySchema);
export default Model;