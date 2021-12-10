// require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for responses to a question
const ResponseSchema = new Schema({
    surveyReference: { type: Schema.Types.ObjectId, ref: 'Survey' },
    questionReference: { type: Schema.Types.ObjectId, ref: 'Question' },
    questionResponse: String
}, {
    collection: "responses"
});

// Now we export the model for use elsewhere
const Model = mongoose.model("Response", ResponseSchema);
module.exports = Model;