// imports
const express = require("express");
const SurveyModel = require("../models/surveys");

// Read our collection and send it to the our survey list page
module.exports = {
    // DISPLAY THE LIST OF SURVEYS
    DisplayListPage: function(req, res, next) {
        // Logic for displaying the list page goes here
        SurveyModel.find(function (err, surveyCollection) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            console.log("COLLECTION: " + surveyCollection);
            res.render("content/survey/survey-list", { title: 'Survey list', page: 'survey/list', survey: surveyCollection })
        })
    },
    // DISPLAY THE PAGE TO EDIT A SURVEY
    DisplayEditPage: function(req, res, next) {
        // logic for displaying our page to edit surveys
        let id = req.params.id;
        SurveyModel.findById(id, {}, {}, (err, surveyToEdit) => {
            if (err) {
                console.error(err);
                res.end(err);
            };
            console.log("SURVEY TO EDIT: " + surveyToEdit);
            res.render("content/survey/survey-edit", { title: "Survey Edit", page: "survey/edit", item: surveyToEdit })
        })
    },
    // DISPLAY THE PAGE TO ADD A SURVEY
    DisplayAddPage(req, res, next) {
        // just show the edit view WITHOUT an item.
        res.render("content/survey/survey-edit", { title: 'Add Contact', page: 'survey/edit', item: '' })
    },

    // PROCESS THE ADD PAGE
    ProcessAddPage: function(req, res, next) {
        let newItem = new SurveyModel({
            "surveyName": req.body.surveyName,
            "surveyDescription": req.body.surveyDescription,
        });
    },

    // PROCESS THE PAGE TO DELETE A SURVEY
    ProcessDeletePage: function(req, res, next) {
        let id = req.params.id;
        SurveyModel.remove({_id: id}, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.redirect("survey/list");
        })
    }

}