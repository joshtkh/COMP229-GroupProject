// require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create a schema for our surveys in MongoDB
const SurveySchema = new Schema({
    surveyName: String,
    surveyDescription: String,
    surveyTakenCount: Number,
    surveyQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
}, {
    collection: "surveys"
});

// Now we export the model for use elsewhere
const Model = mongoose.model("Survey", SurveySchema);
module.exports = Model;