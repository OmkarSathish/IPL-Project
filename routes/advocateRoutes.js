const { Router } = require("express");
const router = Router();
const routes = require("../controllers/advocateController");
const {
    checkAdvocateInfo,
    validateReview,
} = require("../middlewares/checkAdvocateInfo");
const Advocate = require("../models/advocateModel");

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const advocate = await Advocate.findById(id);
    if (!advocate.author.equals(req.user._id)) {
        throw new ExpressError("You need to be logged in to add a profile");
    }
    next();
};

// Fetched all advocates
router.route("/all").get(routes.getAllAdvocates);
// Renders form to enter new advocate details and send it to saveNewAdvocate
router.route("/add").get(routes.addAdvocate);
// Takes the details and saves new advocate details
router.route("/").post(checkAdvocateInfo, routes.saveNewAdvocate);
// Fetches advocate with a particular ID
router.route("/:id").get(routes.getAdvocate);
// Update a particular advocate's profile and sends it to reSaveProfile
router.route("/:id/edit").get(routes.editAdvocateProfile);
router
    .route("/:id")
    .put(checkAdvocateInfo, routes.reSaveAdvocateProfile);
// Delete Advocate Profile
router.route("/:id").delete(routes.deleteAdvocateProfile);
// POST reviews
router.route("/:id/reviews").post(validateReview, routes.giveReview);
// // DELETE Reviews
router.route("/:id/reviews/:reviewId").delete(routes.removeReview);

module.exports = router;
