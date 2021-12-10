// imports
const SurveyModel = require("../models/surveys");
const QuestionModel = require("../models/question");
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
                return res.end(err);
            }
            return res.render("content/survey/survey-list", { title: 'Survey list', page: 'take/list', survey: surveyCollection, user: req.user})
        })
    },
    // Display the page where anyone can take a survey
    DisplayTakeSurveyPage: async function(req, res) {
        // logic for displaying our page to edit surveys
        let id = req.params.id;
        try {
            const surveyToTake = await SurveyModel.findById(id);
            // Now we need to add the survey questions into a list we can pass to the page
            const questionArray = [];
            for (let i = 0; i < surveyToTake.surveyQuestions.length; i++) {
                try {
                    const currentQuestion = await QuestionModel.findById(surveyToTake.surveyQuestions[i]._id);
                    questionArray.push(currentQuestion);
                } catch (err) {
                    console.error(err);
                    console.log("Error with QuestionModel.findById inside DisplayTakeSurveyPage.");
                    return res.end(err);
                }
            }
            // Now we can render the page and send it the variables it needs
            console.log("SURVEY TO TAKE: " + surveyToTake);
            return res.render("content/survey/take-survey", { title: `${surveyToTake.surveyName}`, page: "take", item: surveyToTake, questions: questionArray, user: req.user });
        } catch (err) {
            console.log("Error in DisplayTakeSurvey page.");
            console.error(err);
            return res.end(err);
        }
    },
    // Process the results of the survey through this function
    ProcessTakeSurveyPage: async function(req, res) {
        // grab the id first so we can find the survey being taken
        let id = req.params.id;
        try {
            // Now search for the current survey model being used.
            const currentSurvey = await SurveyModel.findById(id);
            // Also need a reference to all the questions in the survey
            const questionArray = [];
            for (let i = 0; i < currentSurvey.surveyQuestions.length; i++) {
                try {
                    const currentQuestionId = await QuestionModel.findById(currentSurvey.surveyQuestions[i]._id);
                    questionArray.push(currentQuestionId);
                } catch (err) {
                    console.log("Error with QuestionModel.findById in ProcessTakeSurveyPage.");
                    console.error(err);
                    return res.end(err);
                }
            }
            // DONE: Create a new response model that holds the value
            // of the response for each question, and a reference to
            // that question & survey. (see models/response.js for model ref)
            // we need to loop through each response 
            for (const [key, value] of Object.entries(req.body.surveyResponses)) {
                console.log("key/value: ", key, value);
                // create a response object from the request data
                let newResponse = new ResponseModel({
                    "surveyReference": currentSurvey._id,
                    "questionReference": questionArray[key],
                    "questionResponse": value
                });
                // Now create the model using this data
                ResponseModel.create(newResponse, (err) => {
                    if(err) {
                        console.log("Error creating ResponseModel");
                        console.error(err);
                        return res.end(err);
                    }
                });
                // Now the response model has been created from the users responses, we redirect back to the home page.
                return res.redirect("/");
            }
        } catch(error) {
            console.log("Error caught in ProcessTakeSurveyPage function!");
            console.log(error);
            return res.end(error);
        }  
    }
}