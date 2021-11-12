// require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for our questions in MongoDB
const QuestionSchema = new Schema({
    questionText: String,
    questionResponses: [String]
}, {
    collection: "questions"
});

// Now we export the model for use elsewhere
const Model = mongoose.model("Question", QuestionSchema);
module.exports = Model;