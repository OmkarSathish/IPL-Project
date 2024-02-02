const { Router } = require("express");
const router = Router();
const routes = require("../controllers/advocateController");

// Fetched all advocates
router.route("/all").get(routes.getAllAdvocates);
// Renders form to enter new advocate details and send it to saveNewAdvocate
router.route("/add").get(routes.addAdvocate);
// Takes the details and saves new advocate details
router.route("/").post(routes.saveNewAdvocate);
// Fetches advocate with a particular ID
router.route("/:id").get(routes.getAdvocate);
// Update a particular advocate's profile and sends it to reSaveProfile
router.route("/:id/edit").get(routes.editAdvocateProfile);
router.route("/:id").put(routes.reSaveAdvocateProfile);
// Delete Advocate Profile
router.route("/:id").delete(routes.deleteAdvocateProfile);

module.exports = router;
