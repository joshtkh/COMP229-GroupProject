// imports
const SurveyModel = require("../models/surveys");
const QuestionModel = require("../models/question");

// Read our collection and send it to the our survey list page
module.exports = {
    // DISPLAY THE PAGE TO EDIT A SURVEY
    DisplayEditPage: function(req, res) {
        // logic for displaying our page to edit surveys
        let id = req.params.id;
        SurveyModel.findById(id, {}, {}, (err, surveyToEdit) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            console.log("SURVEY TO EDIT: " + surveyToEdit);
            res.render("content/survey/survey-edit", { title: "Survey Edit", page: "survey/edit", item: surveyToEdit, user: req.user })
        });
    },
    // DISPLAY THE PAGE TO ADD A SURVEY
    DisplayAddPage(req, res) {
        // just show the edit view WITHOUT an item.
        res.render("content/survey/survey-edit", { title: 'Add Survey', page: 'survey/edit', item: '', user: req.user })
    },

    // PROCESS THE ADD PAGE
    ProcessAddPage: function(req, res) {
        // create a new survey and add it to the database.
        // First we need to create question objects from the questions submitted by the user.
        let questionArray = [];
        for (const [key, value] of Object.entries(req.body.surveyQuestions)) {
            let newQuestion = new QuestionModel ({
                "questionText": value,
                "questionResponses": req.body[`surveyQ${parseInt(key)+1}Answer`]
            });
            QuestionModel.create(newQuestion, (err) => {
                if(err) {
                    console.error(err);
                    res.end(err);
                }
            });
            questionArray.push(newQuestion);
        }
        // Now all our questions are stored inside questionArray
        // Now we can create a survey model 
        let newSurvey = new SurveyModel ({
            "surveyName": req.body.surveyName,
            "surveyDescription": req.body.surveyDescription,
            "surveyQuestions": questionArray
        });
        SurveyModel.create(newSurvey, (err) => {
            if(err) {
                console.error(err);
                res.end(err);
            }
        });
        res.redirect("/take/list");
        //res.json(req.body); //DEBUG LINE FOR CHECKING OUT req.body CONTENTS. DONT DELETE, MAY NEED FOR TESTING.
    },

    // PROCESS THE EDIT PAGE
    ProcessEditPage: function(req, res) {
        let id = req.params.id;

        // Now we need to create a new item using the SurveyModel,
        // and apply all the changes that the user made to it.

        // First we need to create question objects from the questions submitted by the user.
        let questionArray = [];
        for (const [key, value] of Object.entries(req.body.surveyQuestions)) {
            let newQuestion = new QuestionModel ({
                "questionText": value,
                "questionResponses": req.body[`surveyQ${parseInt(key)+1}Answer`] // This parses the correct question response based on the loop
            });
            QuestionModel.create(newQuestion, (err) => {
                if(err) {
                    console.error(err);
                    res.end(err);
                }
            })
            questionArray.push(newQuestion);
        }

        // Now we create a new item from the updated data.
        let updatedItem = new SurveyModel({
            "_id": id,
            "surveyName": req.body.surveyName,
            "surveyDescription": req.body.surveyDescription,
            "surveyQuestions": questionArray
        })

        // After, we need to call SurveyModel.updateOne() to update the
        // correct Survey.
        SurveyModel.updateOne({ _id: id }, updatedItem, {}, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            // After it is added, redirect the user back to the list page.
            res.redirect("/take/list");
        })
    },

    // PROCESS THE PAGE TO DELETE A SURVEY
    ProcessDeletePage: function(req, res) {
        let id = req.params.id;
        SurveyModel.findByIdAndDelete(id, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.redirect("/take/list");
        });
    }

}