// imports
const { DisplayTakeSurveyPage, ProcessTakeSurveyPage, DisplayListPage } = require("../controllers/take-survey");
// router ref
const express = require("express");
const router = express.Router();

// Survey list route
router.get('/list', DisplayListPage);
// route appropriate pages for taking a survey
router.get("/:id", DisplayTakeSurveyPage);
router.post("/:id", ProcessTakeSurveyPage);

// EXPORT
module.exports = router;

