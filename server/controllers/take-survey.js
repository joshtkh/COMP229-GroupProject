// imports
const SurveyModel = require("../models/surveys");
const ResponseModel = require("../models/response");

// Export routes
module.exports = {
    // Display the list page for anyone to take surveys from
    // DISPLAY THE LIST OF SURVEYS
    DisplayListPage: function(req, res) {
        // Logic for displaying the list page goes here
        SurveyModel.find(function (err, surveyCollection) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            console.log("COLLECTION: " + surveyCollection);
            res.render("content/survey/survey-list", { title: 'Survey list', page: 'take/list', survey: surveyCollection, user: req.user})
        })
    },
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
            res.render("content/survey/take-survey", { title: `${surveyToTake.surveyName}`, page: "take", item: surveyToTake, user: req.user })
        });
    },
    // Process the results of the survey through this function
    ProcessTakeSurveyPage: async function(req, res) {
        // grab the id first so we can find the survey being taken
        let id = req.params.id;
        // Now search for the current survey model being used.
        try {
            const currentSurvey = await SurveyModel.findById(id);
            // DONE: Create a new response model that holds the value
            // of the response for each question, and a reference to
            // that question. (see models/response.js for model ref)
            // we need to loop through each response 
            for (const [key, value] of Object.entries(req.body.surveyResponses)) {
                // create a response object from the request data
                let newResponse = new ResponseModel({
                    "questionReference": currentSurvey._id,
                    "questionResponse": value
                });
                // Now create the model using this data
                ResponseModel.create(newResponse, (err) => {
                    if(err) {
                        console.log("Error creating ResponseModel");
                        console.error(err);
                        res.end(err);
                    }
                });
                // Now the response model has been created from the users responses, we redirect back to the home page.
                res.redirect("/");
            }
        } catch(error) {
            console.log("Error caught in ProcessTakeSurveyPage function!");
            console.log(error);
            res.end(error);
        }  
    }
}