// imports
const { DisplayTakeSurveyPage, ProcessTakeSurveyPage } = require("../controllers/take-survey");
// router ref
const express = require("express");
const router = express.Router();

// route appropriate pages for taking a survey
router.get("/take/:id", DisplayTakeSurveyPage);
router.post("/take/:id", ProcessTakeSurveyPage);

// EXPORT
module.exports = router;

