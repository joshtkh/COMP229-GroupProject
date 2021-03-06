// survey.js ROUTER
// imports
const express = require("express");
const { DisplayAddPage, DisplayEditPage, ProcessAddPage, ProcessEditPage, ProcessDeletePage } = require("../controllers/survey");

// reference to the router
const router = express.Router();

// route apprpriate survey pages
router.get('/add', DisplayAddPage);
router.get('/edit/:id', DisplayEditPage);

// PROCESS the survey pages.
router.post('/add', ProcessAddPage);
router.post('/edit/:id', ProcessEditPage);

// DELETE with this route.
router.get("/delete/:id", ProcessDeletePage);

// EXPORT
module.exports = router;