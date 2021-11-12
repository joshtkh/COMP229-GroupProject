// survey.js ROUTER

// imports
const { DisplayListPage, DisplayAddPage, DisplayEditPage, ProcessDeletePage } = require("../controllers/survey");

// route apprpriate survey pages
router.get('/list', DisplayListPage);
router.get('/add', DisplayAddPage);
router.get('/edit/:id', DisplayEditPage);

// PROCESS the survey pages.

// DELETE with this route.
router.get("/delete/:id", ProcessDeletePage);