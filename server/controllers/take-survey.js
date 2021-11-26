// imports
const SurveyModel = require("../models/surveys");
const ResponseModel = require("../models/response");

// Export routes
module.exports = {
    // Display the page where anyone can take a survey
    DisplayTakeSurveyPage: function(req, res) {
        // logic for displaying our page to edit surveys
        let id = req.params.id;
        SurveyModel.findById(id, {}, {}, (err, surveyToTake) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            console.log("SURVEY TO TAKE: " + surveyToTake);
            res.render("content/survey/survey-take", { title: `${surveyToTake.surveyName}`, page: "take", item: surveyToTake })
        })
    },
    // Process the results of the survey through this function
    ProcessTakeSurveyPage: function(req, res) {
        // grab the id first so we have a reference to it later
        let id = req.params.id;
        // TODO: Create a new response model that holds the value
        // of the response for each question, and a reference to
        // that question. (see models/response.js for model ref)
    }
}