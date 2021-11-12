// survey.js ROUTER
// imports
const express = require("express");
const { DisplayListPage, DisplayAddPage, DisplayEditPage, ProcessDeletePage } = require("../controllers/survey");
// reference to the router
const router = express.Router();

// route apprpriate survey pages
router.get('/list', DisplayListPage);
router.get('/add', DisplayAddPage);
router.get('/edit/:id', DisplayEditPage);

// PROCESS the survey pages.
//router.post('/add', ProcessAddPage);
//router.post('/edit:id', ProcessEditPage);

// DELETE with this route.
router.get("/delete/:id", ProcessDeletePage);

// EXPORT
module.exports = router;